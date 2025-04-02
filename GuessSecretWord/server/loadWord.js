import fs from "fs/promises";

export async function loadWord(number, repeat) {
  let wordList;

  try {
    const buf = await fs.readFile("./data/secretWords.json");
    wordList = JSON.parse(buf);
  } catch (error) {
    console.error("fel vid inläsning", error);
  }

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
    return [];
  }

  if (remove.length > 0) {
    const newLista = sortedList.filter((word) => !remove.includes(word));

    if (newLista == 0) {
      return false;
    } else {
      const randomWord = newLista[Math.floor(Math.random() * newLista.length)];
      return randomWord;
    }
  } else {
    const randomWordNoRep =
      sortedList[Math.floor(Math.random() * sortedList.length)];

    return randomWordNoRep;
  }
}
