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

  const checkIndex: number[] = [];

  const result = guessedWord.map((letter, index) => {
    if (letter === secret[index]) {
      const i = secret.indexOf(letter);
      checkIndex.push(i);
      return { letter: letter, secret: "Correct" };
    } else {
      return { letter: letter, secret: "Incorrect" };
    }
  });

  const checkSecret = result.map((res) => {
    if (secret.includes(res.letter)) {
      const j = secret.indexOf(res.letter);
      if (checkIndex.includes(j)) {
        return res;
      } else {
        checkIndex.push(j);
        return { letter: res.letter, secret: "Misplaced" };
      }
    } else {
      return res;
    }
  });

  const feedback = { checkSecret, correct, stopTime, totalTime };

  return feedback;
}
