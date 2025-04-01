function HomePage() {
  return (
    <>
      <div className="flex flex-col items-center">
        <img
          src="/GuessWord1000.png"
          alt="Guess the word"
          className="border-[0.5rem] border-solid border-black rounded-md"
        />
        <h1 className="text-4xl font-bold p-2">Guess The Word</h1>
        <p className="text-xl max-w-[600px]">
          This is a word game where your quest is to guess the secret word. How
          many guesses and time do you need to solove the secret? Will you top
          the highscore board?
        </p>
        <p className="text-xl font-bold m-4">Let the game begin!</p>
      </div>
    </>
  );
}
export default HomePage;
