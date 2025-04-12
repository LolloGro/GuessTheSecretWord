import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import { loadWord } from "./src/loadWord.js";
import checkGuess from "./src/checkGuess.js";
import timer from "./src/timer.js";
import counter from "./src/counter.js";
import { Result } from "./src/models.js";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
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

let secret;
let ID;
let num;
let rep;
let time;
let count;
let timeResult;
let stopTime;
let wordGuessed = [];

app.post("/game/secretword/:num/:rep", async (req, res) => {
  const number = req.params.num;
  const repeat = req.params.rep;
  ID = uuidv4();
  const word = await loadWord(number, repeat);
  time = timer("start");
  count = counter("stop");
  secret = word.toLowerCase();
  num = number;
  rep = repeat;
  wordGuessed = [];
  console.log("word", word);
  if (word.length > 0) {
    res.json({ display: false, ID: ID });
  } else res.json("error");
});

app.post("/game/guess/:guess/:id", (req, res) => {
  const guess = req.params.guess;
  const playerID = req.params.id;

  if (playerID === ID) {
    wordGuessed.push(guess);
    const result = checkGuess(guess, secret);
    timeResult = timer("stop", time);
    stopTime = result.stopTime;
    count = counter("start");
    res.status(201).json({ result: result, time: timeResult, count: count });
  } else {
    res.status(404).end();
  }
});

app.post("/game/highscore/:playerID", async (req, res) => {
  await mongoose.connect("mongodb://localhost:27017/highscore");
  const playerID = req.params.playerID;
  if (playerID === ID) {
    const newResult = new Result({
      playerID: playerID,
      name: req.body.name,
      startTime: time,
      stopTime: stopTime,
      time: timeResult,
      count: count,
      gusses: wordGuessed,
      letter: num,
      repeat: rep,
    });
    await newResult.save();
    res.status(201);
  } else {
    res.status(404).end();
  }
});

app.get("/highscore", async (req, res) => {
  await mongoose.connect("mongodb://localhost:27017/highscore");
  const result = await Result.find();
  res.render("highscore", {
    results: result.map((a) => {
      return {
        name: a.name,
        time: a.time,
        count: a.count,
        letter: a.letter,
        repeat: a.repeat,
      };
    }),
  });
});

app.get("/game/highscore/number/:num", async (req, res) => {
  await mongoose.connect("mongodb://localhost:27017/highscore");
  const number = req.params.num;
  const highscore = await Result.find({ letter: number });

  res.json({
    results: highscore.map((a) => {
      return {
        name: a.name,
        time: a.time,
        count: a.count,
        letter: a.letter,
        repeat: a.repeat,
      };
    }),
  });
});

app.get("/game/highscore/repeat/:rep", async (req, res) => {
  await mongoose.connect("mongodb://localhost:27017/highscore");
  const repeat = req.params.rep;
  const score = await Result.find({ repeat: repeat });

  res.json({
    results: score.map((b) => {
      return {
        name: b.name,
        time: b.time,
        count: b.count,
        letter: b.letter,
        repeat: b.repeat,
      };
    }),
  });
});

app.use("/static", express.static("static"));
app.use("/file", express.static("../frontend/dist"));

app.listen(5080, () => {
  console.log("server started on 5080");
});
