export default function checkGuess(
  guess: string,
  answer: string,
  time: number
) {
  let correct: boolean;
  let stopTime: number = 0;
  let totalTime: number = 0;

  if (answer === guess) {
    stopTime = Date.now();
    const timeResult: number = stopTime - time;
    totalTime = Math.round(timeResult / 1000);
    correct = true;
  } else {
    correct = false;
  }

  const secret = answer.split("");
  const guessedWord = guess.split("");

  const checkSecret: { secret: string; letter: string }[] = [];

  for (let i = 0; i < secret.length; i++) {
    if (secret[i] == guessedWord[i]) {
      checkSecret.push({ secret: "Correct", letter: guessedWord[i] });
    } else if (secret.includes(guessedWord[i])) {
      checkSecret.push({ secret: "Misplaced", letter: guessedWord[i] });
    } else {
      checkSecret.push({ secret: "Incorrect", letter: guessedWord[i] });
    }
  }

  const feedback = { checkSecret, correct, stopTime, totalTime };

  return feedback;
}
