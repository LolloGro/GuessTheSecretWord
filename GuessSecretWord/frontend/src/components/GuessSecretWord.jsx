import { useState } from "react";

import RegHighscore from "./RegHighscore";

function GuessSecretWord({ num }) {
  //En tidtagning ska starta när besökaren börjar att gissa och stoppas när denna gissat rätt
  //Skicka vidare antal gissningar och tid om besökaren vill registrera sitt resultat när gissat rätt

  //Här angess gissningen
  const [newGuess, setGuess] = useState("");

  function handleGuess(event) {
    setGuess(event.target.value);
  }

  //Här raknas antalet gissningar
  const [count, setCount] = useState(0);
  console.log("klick", count);
  function handleCount() {
    setCount(count + 1);
  }

  //Här sätts error om gissning ej fylller krav
  const [error, setError] = useState("");
  function handleError(err) {
    setError(err);
  }

  //Kär kontrolleras om gissningar uppfyller krav och sätter gissning om OK
  function CheckAnswer(wordGuessed, num) {
    if (wordGuessed === "") {
      handleError("Cant be empty");
      return;
    }
    if (wordGuessed.length !== num) {
      handleError("Wrong number of letters");
      return;
    }
    setGuess("");
    handleCount();
    loadCheck(wordGuessed);
    return;
  }

  //Här skickas gissningen in för kontroll och retunerar ett svar.

  async function loadCheck(guess) {
    const res = await fetch(`/api/${guess}`);
    if (res.ok) {
      const result = await res.json();
      setResult(result);
    } else {
      console.error("Error", res.status);
    }
  }

  //Här tas resultatet emot efter att gissningar har kontrollerats
  const [result, setResult] = useState([]);

  //Ska jag spara resultat så att spelaren kan följa sina gissningar

  //GÖr om till en useEffect som körs när resulr ändras

  function getColor(secret) {
    if (secret == "Correct") {
      return "bg-lime-500";
    } else if (secret == "Incorrect") {
      return "bg-red-500";
    } else {
      return "bg-yellow-300";
    }
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
              setError("");
              CheckAnswer(newGuess, num);
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
