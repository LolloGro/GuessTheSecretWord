import { useState } from "react";
import Button from "./button";

function RegHighscore({ open, time, count, id }) {
  const [name, setName] = useState("");
  function handleName(event) {
    setName(event.target.value);
  }

  const [error, setError] = useState("");
  function handleError(err) {
    setError(err);
  }

  async function sendResult(player) {
    if (player === "") {
      handleError("You must enter your name");
      return;
    } else {
      const res = await fetch(`/game/highscore/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: player }),
      });
      if (res.status == 201) {
        console.log("Ok");
      } else {
        console.error("Error", res.status);
      }
    }
  }

  return (
    <>
      {open && (
        <form>
          <div className="mt-2 mb-4 flex flex-col items-center">
            <h3 className="text-2xl font-bold">Congratulation</h3>
            <p>You solved the quest!</p>
            <p>Gusses made: {count}</p>
            <p>Your time: {time}s</p>
            <p className="font-bold text-xl">
              Du you want to register your result?
            </p>
            <p className="text-red-800">{error}</p>
            <label className="font-bold mb-1" htmlFor="namn">
              Enter name:
            </label>
            <input
              className="border-solid border-black border rounded-md font-bold p-1"
              type="text"
              name="namn"
              id="namn"
              value={name}
              onChange={handleName}
              required
            />
            <div className="flex">
              <Button
                type={"submit"}
                text={"Register"}
                onClick={() => {
                  sendResult(name);
                }}
              ></Button>
              <div className="min-w-36 border rounded-md mt-4 bg-button-blue  text-white font-bold pt-3 pb-3 pl-4 pr-4 hover:bg-sky-700 text-center">
                <a href="/">Restart</a>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
export default RegHighscore;
