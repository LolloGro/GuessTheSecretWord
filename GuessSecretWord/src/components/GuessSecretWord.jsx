import { useState } from "react";

function GuessSecretWord() {
  //Ta emot hemligt ord samt längd på ord
  //En tidtagning ska starta när besökaren börjar att gissa och stoppas när denna har gissat klart
  //Varje ord ska vissas som en lista där varje ord ska ha en egen class beroende på resultat
  //Skicka antal gissningar och tid om besökren vill registrera sitt resultat när gissat rätt

  const hemligt = "lite";

  const [newGuess, setGuess] = useState("");

  function handleGuess(event) {
    setGuess(event.target.value);
  }

  const [result, setResult] = useState([]);
  function handleResult(checkSecret) {
    setResult(checkSecret);
  }

  const [error, setError] = useState("");
  function handleError(err) {
    setError(err);
  }

  function CheckAnswer(wordGuessed, answer, num) {
    if (wordGuessed === "") {
      handleError("Cant be empty");
      return;
    }
    if (wordGuessed.length !== num) {
      handleError("Wrong number of letters");
      return;
    }

    const guess = wordGuessed.toLowerCase();

    if (answer === guess) {
      handleError("RÄTT GISSAT");
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

    handleResult(checkSecret);
    return;
  }

  return (
    <>
      <div>
        <h2 className="text-3xl">Make your guess</h2>
        <input
          type="text"
          value={newGuess}
          onChange={handleGuess}
          placeholder="..."
        />
        <label>Guess the secret word</label>
        <button
          onClick={() => {
            CheckAnswer(newGuess, hemligt, 4);
          }}
        >
          GISSA
        </button>
        <p>Time:</p>
        <p>Guesses:</p>
      </div>
      <div>
        <p> Feedback:</p>
        <ul>
          {result.map((word, index) => {
            return (
              <li key={index}>
                {word.letter}
                {" - "}
                {word.secret}
              </li>
            );
          })}
        </ul>
        <p>Error:{error}</p>
      </div>
    </>
  );
}
export default GuessSecretWord;
