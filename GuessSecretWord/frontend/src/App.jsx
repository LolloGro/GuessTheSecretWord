import { useState } from "react";
import HomePage from "./components/HomePage";
import GuessSecretWord from "./components/GuessSecretWord";
import SecretWord from "./components/SecretWord";
import RegHighscore from "./components/RegHighscore";

function App() {
  const [num, setNum] = useState(0);
  function handleNum(num) {
    setNum(num);
  }

  const [display, setDisplay] = useState(false);
  function handleDisplay(show) {
    setDisplay(show);
  }

  const [register, setRegister] = useState(false);
  function handleRegister(show) {
    setRegister(show);
  }

  return (
    <>
      <HomePage />
      <SecretWord onNum={handleNum} onDisplay={handleDisplay} />
      <GuessSecretWord num={num} display={display} onCorrect={handleRegister} />
      <RegHighscore register={register} onDisplay={handleDisplay} />
    </>
  );
}

export default App;
