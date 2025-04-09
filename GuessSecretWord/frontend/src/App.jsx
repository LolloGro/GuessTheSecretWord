import { useState } from "react";
import HomePage from "./components/HomePage";
import GuessSecretWord from "./components/GuessSecretWord";
import SecretWord from "./components/SecretWord";

function App() {
  const [num, setNum] = useState(0);
  function handleNum(num) {
    setNum(num);
  }

  const [display, setDisplay] = useState(false);
  function handleDisplay(show) {
    setDisplay(show);
  }

  const [id, setId] = useState("");
  function handleId(uniq) {
    setId(uniq);
  }

  return (
    <>
      <HomePage />
      <SecretWord onNum={handleNum} onDisplay={handleDisplay} onID={handleId} />
      <GuessSecretWord num={num} display={display} id={id} />
    </>
  );
}

export default App;
