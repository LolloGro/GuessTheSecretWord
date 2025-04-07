import { useState } from "react";

function GuessSecretWord({ num, display }) {
  console.log("GuessSecretword - display", display);

  const [newGuess, setGuess] = useState("");
  function handleGuess(event) {
    setGuess(event.target.value);
  }

  const [error, setError] = useState("");
  function handleError(err) {
    setError(err);
  }

  function CheckAnswer(wordGuessed, num, count) {
    if (wordGuessed === "") {
      handleError("Cant be empty");
      return;
    }
    if (wordGuessed.length != num) {
      handleError("Wrong number of letters");
      return;
    }
    setGuess("");
    loadCheck(wordGuessed, count);
    return;
  }

  const [result, setResult] = useState([]);

  const [allResult, setAllResult] = useState([]);
  function handleAllResult(result) {
    setAllResult([...allResult, result]);
  }

  async function loadCheck(guess) {
    const res = await fetch(`/game/guess/${guess}`);
    if (res.ok) {
      const result = await res.json();

      setResult(result);
    } else {
      console.error("Error", res.status);
    }
  }

  function getColor(secret) {
    if (secret == "Correct") {
      return "bg-[#579C05]";
    } else if (secret == "Incorrect") {
      return "bg-[#FE2D28]";
    } else {
      return "bg-[#FAB206]";
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
            className="col-span-2 border rounded-md mt-4 bg-button-blue text-white pt-2 pb-2 pl-4 pr-4"
            onClick={() => {
              setError("");
              handleAllResult(result);
              CheckAnswer(newGuess, num);
            }}
          >
            Make you guess
          </button>
        </div>
        <div className="text-center">
          <ul className="flex flex-row justify-center">
            {result.map((word, index) => {
              return (
                <li
                  key={index}
                  className={`content-center h-16 w-16 m-1 border-black border-[0.5rem] rounded-md text-2xl font-bold ${getColor(
                    word.secret
                  )}`}
                >
                  {word.letter}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="text-center">
          {allResult.map((guess, index) => {
            return (
              <ul key={index} className="flex flex-row justify-center">
                {guess.map((word, index) => {
                  return (
                    <li
                      key={index}
                      className={`content-center h-16 w-16 m-1 border-black border-[0.5rem] rounded-md text-2xl font-bold ${getColor(
                        word.secret
                      )}`}
                    >
                      {word.letter}
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default GuessSecretWord;
