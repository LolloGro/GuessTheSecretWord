import { useState } from "react";
import { useEffect } from "react";

export default function SecretWord({ onFilter, onDisplay }) {
  //Onclick fetcha ord utifrån parametrar ´querystring

  //KÖrs efter komponenter renders
  //Array med värden, om värden ändras endast då körs funktionen
  //När array tom körs funktionen bara första gången när kompoinentent renderas

  useEffect(() => {
    async function loadWords() {
      const response = await fetch("/api/secretword");
      const payload = await response.json();
      console.log("payload", payload);
    }
    loadWords();
  }, []);

  const [number, setNumber] = useState(4);

  function handleNumber(event) {
    setNumber(event.target.value);
  }

  const [repeat, setRep] = useState(true);

  function handleRep(event) {
    setRep(event.target.value);
  }

  const [error, setError] = useState("");
  function handleError(err) {
    setError(err);
  }

  //Ska kunna öppnas åter om besökaren vill börja om från början med ett nytt ord
  const [display, setDisplay] = useState(true);
  function handleDisplay() {
    setDisplay(!display);
  }
  console.log("display", display);

  //Ord ska hämtas via API Anrop
  const wordList = [
    "alla",
    "stol",
    "bok",
    "skrivbord",
    "aj",
    "kanske",
    "lite",
    "mycket",
    "ajabaja",
  ];

  function sortWords(wordList, number, repeat) {
    const sortedList = wordList.filter((word) => {
      if (word.length == number) {
        return word;
      }
    });

    const remove = [];

    if (repeat === false) {
      for (let i = 0; i < sortedList.length; i++) {
        let check = sortedList[i];

        let checkedWord = /(\w).*\1/.test(check);

        if (checkedWord == true) {
          remove.push(check);
        }
      }
    }

    if (sortedList.length == 0) {
      handleError("No word that matches");
      return;
    }

    if (remove.length > 0) {
      const newLista = sortedList.filter((word) => !remove.includes(word));

      if (newLista == 0) {
        return false;
      } else {
        const randomWord =
          newLista[Math.floor(Math.random() * newLista.length)];
        handleDisplay();
        onDisplay(true);
        onFilter(randomWord);
        return;
      }
    } else {
      const randomWordNoRep =
        sortedList[Math.floor(Math.random() * sortedList.length)];
      handleDisplay();
      onDisplay(true);
      onFilter(randomWordNoRep);
      return;
    }
  }

  return (
    <>
      <div className="m-auto mt-6 max-w-[640px] border-black border-[0.5rem] rounded-lg">
        <div className="p-4 flex flex-col items-center">
          <h2 className="text-3xl mb-2">Make your choice of word</h2>
          <label className="text-xl mb-2">Choose length of word</label>
          <input
            className="w-16 border-solid border-black border rounded-md font-bold p-1 text-center"
            type="number"
            value={number}
            onChange={handleNumber}
            min={0}
          />

          <p className="text-xl p-2">
            Can the same letter occur more than once?
          </p>
          <select
            value={repeat}
            onChange={handleRep}
            className="w-16 border-solid border-black border rounded-md font-bold p-1.5"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <p>{error}</p>
          <button
            className="col-span-2 border rounded-md mt-4 bg-blue-600 text-white p-2"
            onClick={() => {
              handleError("");
              sortWords(wordList, number, repeat);
            }}
          >
            Choose secret word
          </button>
        </div>
      </div>
    </>
  );
}
