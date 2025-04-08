import { useState } from "react";
import Button from "./button";

function SecretWord({ onNum, onDisplay }) {
  const [number, setNumber] = useState(4);

  function handleNumber(event) {
    setNumber(event.target.value);
  }

  const [repeat, setRep] = useState("yes");

  function handleRep(event) {
    setRep(event.target.value);
  }

  const [error, setError] = useState("");
  function handleError(err) {
    setError(err);
  }

  const [display, setDisplay] = useState(true);
  function handleDisplay(disp) {
    setDisplay(disp);
  }

  async function loadSecret(number, repeat) {
    const res = await fetch(`/game/secretword/${number}/${repeat}`);
    if (res.ok) {
      const close = await res.json();
      if (close == "error") {
        handleError("No words exist, change you search");
      } else {
        handleError("");
        handleDisplay(close);
        onDisplay(true);
      }
    } else {
      console.error("Error", res.status);
    }
  }

  return (
    <>
      {display && (
        <div className="m-auto mb-11 mt-6 max-w-[640px] border-black border-[0.5rem] rounded-lg">
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
              <option value={"yes"}>Yes</option>
              <option value={"no"}>No</option>
            </select>
            <p className="mt-2 text-red-600">{error}</p>
            <Button
              text={"Choose secret word"}
              onClick={() => {
                onNum(number);
                loadSecret(number, repeat);
              }}
            ></Button>
          </div>
        </div>
      )}
    </>
  );
}

export default SecretWord;
