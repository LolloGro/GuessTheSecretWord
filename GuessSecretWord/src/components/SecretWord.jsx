import { useState } from "react";

function SecretWord() {
  const [number, setNumber] = useState(4);

  function handleNumber(event) {
    setNumber(event.target.value);
  }

  //Förhindra att kunna klicka om redan klickat
  const [repeat, setRep] = useState(true);

  function handleRep() {
    setRep(!repeat);
  }

  const [secret, setSecret] = useState("");

  function handleSecret(word) {
    setSecret(word);
  }
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
      console.log("No word");
    }

    if (remove.length > 0) {
      const newLista = sortedList.filter((word) => !remove.includes(word));

      if (newLista == 0) {
        return false;
      } else {
        const randomWord =
          newLista[Math.floor(Math.random() * newLista.length)];
        handleSecret(randomWord);
      }
    } else {
      const randomWordNoRep =
        sortedList[Math.floor(Math.random() * sortedList.length)];
      handleSecret(randomWordNoRep);
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-3xl">Make your choice of word</h2>
        <input
          className="border-s-black bg-yellow-200"
          type="number"
          value={number}
          onChange={handleNumber}
          min={0}
        />
        <label>Choose length of word</label>
        <p>Can the same letter occur more than once</p>
        <input type="radio" defaultChecked name="repeat" onClick={handleRep} />
        <label>Yes</label>
        <input type="radio" name="repeat" onClick={handleRep} />
        <label>No</label>
        <button
          onClick={() => {
            sortWords(wordList, number, repeat);
          }}
        >
          Choose secret word
        </button>
        <p>Hemligt ord: {secret}</p>
      </div>
    </>
  );
}
export default SecretWord;
