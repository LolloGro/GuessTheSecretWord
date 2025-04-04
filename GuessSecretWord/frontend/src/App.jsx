import { useState } from "react";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import GuessSecretWord from "./components/GuessSecretWord";
import SecretWord from "./components/SecretWord";

function App() {
  const [secret, setSecret] = useState("");
  function handleSecret(word) {
    setSecret(word);
  }

  const [display, setDisplay] = useState("hide");
  function handleDisplay(show) {
    setDisplay(show);
  }

  return (
    <>
      <HomePage />
      <SecretWord onFilter={handleSecret} onDisplay={handleDisplay} />
      <GuessSecretWord secret={secret} display={display} />
    </>
  );
}

export default App;
