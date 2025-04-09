import { useState } from "react";
import { useEffect } from "react";
import Button from "./button";

function GuessSecretWord({ num, display, onCorrect }) {
  const [newGuess, setGuess] = useState("");
  function handleGuess(event) {
    setGuess(event.target.value);
  }

  const [error, setError] = useState("");
  function handleError(err) {
    setError(err);
  }

  const [result, setResult] = useState([]);

  const [allResult, setAllResult] = useState([]);
  function handleAllResult(result) {
    setAllResult([...allResult, result]);
  }

  const [listGuesses, setListGuesses] = useState([]);
  function handleListGuesses(list) {
    setListGuesses(list);
  }

  useEffect(() => {
    function reverseResult() {
      const resultReversed = allResult.reverse();
      handleListGuesses(resultReversed);
    }
    reverseResult(allResult);
  }, [allResult]);

  function CheckAnswer(wordGuessed, num) {
    if (wordGuessed === "") {
      handleError("Cant be empty");
      return;
    }
    if (wordGuessed.length != num) {
      handleError("Wrong number of letters");
      return;
    }
    setGuess("");
    loadCheck(wordGuessed);
    return;
  }

  async function loadCheck(guess) {
    const res = await fetch(`/game/guess/${guess}`);
    if (res.ok) {
      const result = await res.json();
      if (result === "correct") {
        onCorrect(true);
      } else {
        setResult(result);
      }
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
      {display && (
        <div className="m-auto mb-11 max-w-[640px] border-black border-[0.5rem] rounded-lg">
          <div className="p-4 flex flex-col items-center">
            <h2 className="text-3xl mb-2">Guess the secret word</h2>
            <div className="mt-2 mb-b">
              <p>
                If your guess is'nt correct you will reseve feedback about each
                letters occurrence in your guess, to use in coming guesses.
              </p>
              <div className=" mt-2 mb-2 flex flex-row justify-center">
                <div className="h-10 w-10 mr-2 bg-[#579C05]"></div>
                <p>Correct</p>
                <div className="h-10 w-10 mr-2 ml-2 bg-[#FAB206]"></div>
                <p>Misplaced</p>
                <div className="h-10 w-10 mr-2 ml-2 bg-[#FE2D28]"></div>
                <p>Incorrect</p>
              </div>
            </div>
            <label className="text-xl mb-2 font-bold">Type your guess</label>
            <input
              className="border-solid border-black border rounded-md font-bold p-1"
              type="text"
              value={newGuess}
              onChange={handleGuess}
            />
            <p className=" mt-2 text-red-600">{error}</p>
            <Button
              text={"Make you guess"}
              onClick={() => {
                setError("");
                handleAllResult(result);
                CheckAnswer(newGuess, num);
              }}
            ></Button>
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
            {listGuesses.map((guess, index) => {
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
      )}
    </>
  );
}
export default GuessSecretWord;
