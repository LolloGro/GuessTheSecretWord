export default function RegHighscore({ num, rep, count }) {
  //Om spelaren vill registrera sitt resultat ska följande skickas med
  //Nanmn
  //Antal gissningar
  //Tid
  //Antal bokstäver
  //Om samma bokstav för förekomma fler än en gång

  return (
    <>
      <form className="m-auto max-w-[640px] border-black border-[0.5rem] rounded-lg flex justify-evenly">
        <div className="">
          <h2 className="text-2xl font-bold">Congratulation</h2>
          <p>You solved the quest</p>
          <p>Guesses made: {count}</p>
          <p>Your time:</p>
          <p>Can the same letter occur only once: {rep}</p>
          <p>How many numbers do the word consist of: {num}</p>
          <p>Du you want to register you result?</p>
          <label htmlFor="namn">Name:</label>
          <input type="text" name="namn" id="namn" />
          <div>
            <button
              className="col-span-2 border rounded-md mt-4 bg-blue-600 text-white pt-2 pb-2 pl-4 pr-4"
              type="submit"
              onClick={console.log("registrera")}
            >
              Register
            </button>
            <a
              className="col-span-2 border rounded-md mt-4 bg-blue-600 text-white pt-2 pb-2 pl-4 pr-4"
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
