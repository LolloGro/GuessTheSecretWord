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

  if (sortedList.length == 0) {
    //Hantera att visar error meddelande via ID
    return [];
  }

  const remove = [];

  if (repeat === "noRep") {
    for (let i = 0; i < sortedList.length; i++) {
      let check = sortedList[i];

      let checkedWord = /(\w).*\1/.test(check);

      if (checkedWord == true) {
        remove.push(check);
      }
    }
  } else {
    const randomWordRep =
      sortedList[Math.floor(Math.random() * sortedList.length)];
    //secret to lowercase

    return randomWordRep;
  }

  const newLista = sortedList.filter((word) => !remove.includes(word));

  if (newLista.length == 0) {
    return [];
    //Hantera
  } else {
    const randomWord = newLista[Math.floor(Math.random() * newLista.length)];
    //secret to lowercase

    return randomWord;
  }
}
