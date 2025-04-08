export default function checkGuess(guess, answer) {
  if (answer === guess) {
    return "correct";
  }

  const secret = answer.split("");
  const guessedWord = guess.split("");

  const checkSecret = [];

  for (let i = 0; i < secret.length; i++) {
    if (secret[i] == guessedWord[i]) {
      checkSecret.push({ secret: "Correct", letter: guessedWord[i] });
    } else if (secret.includes(guessedWord[i])) {
      const kolla = guessedWord.filter((b) => b == guessedWord[i]);
      const referens = secret.filter((a) => a == guessedWord[i]);
      if (kolla.length <= referens.length) {
        checkSecret.push({ secret: "Misplaced", letter: guessedWord[i] });
      } else {
        checkSecret.push({ secret: "Incorrect", letter: guessedWord[i] });
      }
    } else {
      checkSecret.push({ secret: "Incorrect", letter: guessedWord[i] });
    }
  }

  //Bugg: om skriver en gissning med två lika bokstäver, men det bara finns sådan i det hemliga ordet. Anges att bägge bokstäver är incorrect

  return checkSecret;
}
