import { useState } from "react";

export default function SecretWord({ onNum }) {
  const [number, setNumber] = useState(4);

  function handleNumber(event) {
    setNumber(event.target.value);
  }

  const [repeat, setRep] = useState("rep");

  function handleRep(event) {
    setRep(event.target.value);
  }

  const [display, setDisplay] = useState(false);

  if (display == true) {
    console.log("Med denna kan vi stänga modulen och öppna gissa order");
  }

  async function loadSecret(number, repeat) {
    const res = await fetch(`/api/secretword/${number}/${repeat}`);
    if (res.ok) {
      const close = await res.json();
      console.log(close);
      setDisplay(close);
    } else {
      console.error("Error", res.status);
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
            <option value={"rep"}>Yes</option>
            <option value={"noRep"}>No</option>
          </select>
          <p>"error messages"</p>
          <button
            className="col-span-2 border rounded-md mt-4 bg-blue-600 text-white p-2"
            onClick={() => {
              onNum(number);
              loadSecret(number, repeat);
            }}
          >
            Choose secret word
          </button>
        </div>
      </div>
    </>
  );
}
