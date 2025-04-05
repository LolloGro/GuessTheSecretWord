import { useState } from "react";
import HomePage from "./components/HomePage";
import GuessSecretWord from "./components/GuessSecretWord";
import SecretWord from "./components/SecretWord";

function App() {
  const [num, setNum] = useState(0);
  function handleNum(num) {
    setNum(num);
  }

  const [display, setDisplay] = useState("hide");
  function handleDisplay(show) {
    setDisplay(show);
  }

  return (
    <>
      <HomePage />
      <SecretWord onNum={handleNum} onDisplay={handleDisplay} />
      <GuessSecretWord num={num} display={display} />
    </>
  );
}

export default App;
