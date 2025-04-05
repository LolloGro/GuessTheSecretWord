import express from "express";
import { engine } from "express-handlebars";
import { loadWord } from "./loadWord.js";
import checkGuess from "./checkGuess.js";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.render("homePage");
});

app.get("/info", (req, res) => {
  res.render("infoPage");
});

app.get("/highscore", (req, res) => {
  res.render("highscore");
});

let secret;

app.get("/api/secretword/:num/:rep", async (req, res) => {
  const number = req.params.num;
  const repeat = req.params.rep;
  const word = await loadWord(number, repeat);
  secret = word;
  console.log("word", word);
  if (word.length > 0) {
    res.json(true);
  }
});

app.get("/api/:guess", (req, res) => {
  const guess = req.params.guess;
  const result = checkGuess(guess, secret);
  console.log("gissning", guess);
  console.log(result);
  res.json(result);
});
//const highscore = [];

/* app.post("/api/results", (res, res) => {
  const newResult = {
    name: req.body.name,
    time: req.body.time,
    count: req.body.count,
    letter: req.body.letters,
    reapeat: req.body.reapeat,
  };
  highscore.push(newResult);

  res.statusCode(201).json({ data: newResult });
}); */

//konverterar JSON till body with post
//app.use(express.json());

app.use("/static", express.static("static"));
app.use("/file", express.static("../frontend/dist"));

app.listen(5080, () => {
  console.log("server started on 5080");
});
