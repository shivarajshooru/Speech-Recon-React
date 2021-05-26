import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [text, setText] = useState("");
  const [randomNumber, setRandomNumber] = useState(randomGeneartor());
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);

  window.SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;

  let recognition = new window.SpeechRecognition();

  recognition.start();

  useEffect(() => {
    if (Number(text) === randomNumber) {
      setResult(`congratulations 'hurray`);
      setScore(score + 1);
      setRandomNumber(randomGeneartor());
    }

    return () => setResult("");
  }, [text]);

  recognition.addEventListener("result", (e) => {
    console.log("hi", { event: e.results[0][0].transcript });
    setText(e.results[0][0].transcript);
  });

  function randomGeneartor() {
    return Math.floor(Math.random() * 100);
  }

  return (
    <div className="App">
      <h1>Text</h1>
      <h4>Score:{score}</h4>
      {result ? (
        <div>{result}</div>
      ) : (
        <div>
          <p>{text}</p>
          <div>Number:{randomNumber}</div>
        </div>
      )}

      <button
        onClick={() => {
          setRandomNumber(randomGeneartor());
          setResult("");
        }}
      >
        Change Number
      </button>
    </div>
  );
}
