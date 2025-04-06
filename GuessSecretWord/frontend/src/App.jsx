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

  const [rep, setRep] = useState("");
  function handleRep(repeat) {
    setRep(repeat);
  }

  console.log("vi kontrollerar om vi tar emot ett värde för red", rep);

  return (
    <>
      <HomePage />
      <SecretWord
        onNum={handleNum}
        onRep={handleRep}
        onDisplay={handleDisplay}
      />
      <GuessSecretWord num={num} rep={rep} display={display} />
    </>
  );
}

export default App;
