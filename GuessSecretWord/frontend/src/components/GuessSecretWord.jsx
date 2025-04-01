import { useState } from "react";
import RegHighscore from "./RegHighscore";

function GuessSecretWord({ secret, display }) {
  //En tidtagning ska starta när besökaren börjar att gissa och stoppas när denna gissat rätt
  //Skicka vidare antal gissningar och tid om besökaren vill registrera sitt resultat när gissat rätt
  //Öppna en div när besökaren gissar rätt som frågar om besökaren vill registrera sitt reaultat
  //secret to lowercase

  console.log("ska det öppnas", display);
  console.log("Secret", secret);

  const [newGuess, setGuess] = useState("");

  function handleGuess(event) {
    setGuess(event.target.value);
  }

  const [count, setCount] = useState(0);
  console.log("klick", count);
  function handleCount() {
    setCount(count + 1);
  }

  const [result, setResult] = useState([]);
  function handleResult(checkSecret) {
    setResult(checkSecret);
  }

  const [error, setError] = useState("");
  function handleError(err) {
    setError(err);
  }

  function getColor(secret) {
    if (secret == "Correct") {
      return "bg-lime-500";
    } else if (secret == "Incorrect") {
      return "bg-red-500";
    } else {
      return "bg-yellow-300";
    }
  }

  function CheckAnswer(wordGuessed, answer) {
    if (wordGuessed === "") {
      handleError("Cant be empty");
      return;
    }
    if (wordGuessed.length !== answer.length) {
      handleError("Wrong number of letters");
      return;
    }

    const guess = wordGuessed.toLowerCase();

    if (answer === guess) {
      handleError("RÄTT");
      return;
    }

    const secret = answer.split("");
    const guessedWord = guess.split("");

    const checkSecret = [];

    for (let i = 0; i < secret.length; i++) {
      if (secret[i] == guessedWord[i]) {
        checkSecret.push({ secret: "Correct", letter: guessedWord[i] });
      } else if (secret.includes(guessedWord[i])) {
        const kolla = guessedWord.filter((b) => b == guessedWord[i]);
        const referens = secret.filter((a) => a == guessedWord[i]);

        if (kolla.length <= referens.length) {
          checkSecret.push({ secret: "Misplaced", letter: guessedWord[i] });
        } else {
          checkSecret.push({ secret: "Incorrect", letter: guessedWord[i] });
        }
      } else {
        checkSecret.push({ secret: "Incorrect", letter: guessedWord[i] });
      }
    }

    handleCount();
    handleResult(checkSecret);
    return;
  }

  return (
    <>
      <div className="m-auto max-w-[640px] border-black border-[0.5rem] rounded-lg">
        <div className="p-4 flex flex-col items-center">
          <h2 className="text-3xl mb-2">Guess the secret word</h2>
          <label className="text-xl mb-2">Type your guess</label>
          <input
            className="border-solid border-black border rounded-md font-bold p-1"
            type="text"
            value={newGuess}
            onChange={handleGuess}
          />

          <p>{error}</p>
          <button
            className="col-span-2 border rounded-md mt-4 bg-blue-600 text-white pt-2 pb-2 pl-4 pr-4"
            onClick={() => {
              setGuess("");
              setError("");
              CheckAnswer(newGuess, secret);
            }}
          >
            Make you guess
          </button>
          <p>Time:</p>
          <p>Guesses made: {count}</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-xl"> Reslut:</p>
          <ul>
            {result.map((word, index) => {
              return (
                <li key={index} className={`text-xl ${getColor(word.secret)}`}>
                  {word.letter}
                  {" - "}
                  {word.secret}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <RegHighscore count={count} />
    </>
  );
}
export default GuessSecretWord;
