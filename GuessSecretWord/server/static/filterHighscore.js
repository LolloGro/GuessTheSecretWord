const button = document.getElementById("button");
const sort = document.getElementById("sort");
button.addEventListener("click", () => {
  sort.style.display = "block";
});

const num = document.getElementById("num");
num.addEventListener("change", filterNum);

async function filterNum(event) {
  try {
    const res = await fetch(`/game/highscore/number/${event.target.value}/`);
    if (res.ok) {
      const filterd = await res.json();
      const display = document.getElementById("filterd");
      display.replaceChildren();
      rep.value = "";
      const scoreBoard = document.getElementById("highscore");
      scoreBoard.style.display = "none";

      filterd.results.forEach((value) => {
        const displayDiv = document.createElement("div");
        displayDiv.className =
          "m-auto mt-6 max-w-[640px] border-black border-[0.5rem] rounded-lg";
        display.append(displayDiv);
        const displayUl = document.createElement("ul");
        displayDiv.append(displayUl);
        const displayName = document.createElement("li");
        displayName.textContent = "Name: " + value.name;
        displayUl.append(displayName);
        const displayTime = document.createElement("li");
        displayTime.textContent = "Time: " + value.time + " s";
        displayUl.append(displayTime);
        const displayGuesses = document.createElement("li");
        displayGuesses.textContent = "Number of guesses: " + value.count;
        displayUl.append(displayGuesses);
        const displayLetters = document.createElement("li");
        displayLetters.textContent = "Number of letters: " + value.letter;
        displayUl.append(displayLetters);
        const displayRepeat = document.createElement("li");
        displayRepeat.textContent =
          "Can the samt letter occur more than once: " + value.repeat;
        displayUl.append(displayRepeat);
      });
    }
  } catch (error) {
    console.error("Error", error);
  }
}

const rep = document.getElementById("rep");
rep.addEventListener("change", filterRep);

async function filterRep(event) {
  try {
    const res = await fetch(`/game/highscore/repeat/${event.target.value}/`);
    if (res.ok) {
      const filterd = await res.json();
      const display = document.getElementById("filterd");
      display.replaceChildren();

      const scoreBoard = document.getElementById("highscore");
      scoreBoard.style.display = "none";
      num.value = 0;
      filterd.results.forEach((value) => {
        const displayDiv = document.createElement("div");
        displayDiv.className =
          "m-auto mt-6 max-w-[640px] border-black border-[0.5rem] rounded-lg";
        display.append(displayDiv);
        const displayUl = document.createElement("ul");
        displayDiv.append(displayUl);
        const displayName = document.createElement("li");
        displayName.textContent = "Name: " + value.name;
        displayUl.append(displayName);
        const displayTime = document.createElement("li");
        displayTime.textContent = "Time: " + value.time + " s";
        displayUl.append(displayTime);
        const displayGuesses = document.createElement("li");
        displayGuesses.textContent = "Number of guesses: " + value.count;
        displayUl.append(displayGuesses);
        const displayLetters = document.createElement("li");
        displayLetters.textContent = "Number of letters: " + value.letter;
        displayUl.append(displayLetters);
        const displayRepeat = document.createElement("li");
        displayRepeat.textContent =
          "Can the samt letter occur more than once: " + value.repeat;
        displayUl.append(displayRepeat);
      });
    }
  } catch (error) {
    console.error("Error", error);
  }
}
