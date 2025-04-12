import fs from "fs/promises";

export async function loadWord(number: number, repeat: string) {
  let wordList: string[] | undefined;

  try {
    const buf = await fs.readFile("./data/secretWords.json");
    wordList = JSON.parse(buf.toString());
  } catch (error) {
    console.error("fel vid inläsning", error);
  }

  let sortedList: string[] | undefined;

  if (wordList != undefined) {
    sortedList = wordList.filter((word: string) => {
      if (word.length == number) {
        return word;
      }
    });
  }

  if (sortedList != undefined) {
    if (sortedList.length == 0) {
      return;
    }

    const remove: string[] = [];

    if (repeat === "no") {
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
      return randomWordRep;
    }

    const newLista = sortedList.filter(
      (word: string) => !remove.includes(word)
    );

    if (newLista.length == 0) {
      return;
    } else {
      const randomWord = newLista[Math.floor(Math.random() * newLista.length)];
      return randomWord;
    }
  }
}
