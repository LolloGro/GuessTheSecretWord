import { useState } from "react";

export default function RegHighscore() {
  const [name, setName] = useState("");
  function handleName(event) {
    setName(event.target.value);
  }

  const [error, setError] = useState("");
  function handleError(err) {
    setError(err);
  }

  async function sendResult(player) {
    console.log("Player", player);
    if (player === "") {
      handleError("Du måste ange ditt namn");
      return;
    } else {
      const res = await fetch("/game/highscore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: player }),
      });
      if (res.status == 201) {
        const close = await res.json();
        console.log("svar efter post", close);
      } else {
        console.error("Error", res.status);
      }
    }
  }

  return (
    <>
      <form className="m-auto max-w-[640px] border-black border-[0.5rem] rounded-lg flex justify-evenly">
        <div className="">
          <h2 className="text-2xl font-bold">Congratulation</h2>
          <p>You solved the quest!</p>
          <p>Du you want to register you result?</p>
          <p className="text-red-800">{error}</p>
          <label htmlFor="namn">Name:</label>
          <input
            className="border-solid border-black border rounded-md font-bold p-1"
            type="text"
            name="namn"
            id="namn"
            value={name}
            onChange={handleName}
            required
          />
          <div>
            <button
              className="col-span-2 border rounded-md mt-4 bg-button-blue text-white pt-2 pb-2 pl-4 pr-4"
              type="submit"
              onClick={() => {
                sendResult(name);
              }}
            >
              Register
            </button>
            <a
              className="col-span-2 border rounded-md mt-4 bg-button-blue text-white pt-2 pb-2 pl-4 pr-4"
              href="/"
            >
              Play again
            </a>
          </div>
        </div>
        <div className="bg-neutral-800">
          <img src="/static/Cup.webp" alt="pokal" />
        </div>
      </form>
    </>
  );
}
