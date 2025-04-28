import express from "express";
import { engine } from "express-handlebars";
import { loadWord } from "./secretword";
import checkGuess from "./checkGuess";
import timer from "./time";
import counter from "./count";
import { v4 as uuidv4 } from "uuid";
import { Pool } from "pg";

const app = express();

const pool = new Pool({
  user: "postgres",
  password: "password",
});

async function CreateTable() {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS score(
      id SERIAL PRIMARY KEY, 
      playerID TEXT NOT NULL, 
      name TEXT NOT NULL, 
      startTime BIGINT NOT NULL, 
      stopTime BIGINT NOT NULL, 
      time INT NOT NULL, 
      count INT NOT NULL, 
      gusses TEXT[] NOT NULL, 
      letter INT NOT NULL, 
      repeat TEXT NOT NULL)`
    );
  } catch (err) {
    console.log("No database");
  }
}

CreateTable();

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

let secret: string;
let ID: string;
let num: number;
let rep: string;
let time: number;
let count: number;
let timeResult: number;
let stopTime: number;
let wordGuessed: string[] = [];

app.post("/game/secretword/:num/:rep", async (req, res) => {
  const number = Number(req.params.num);
  const repeat: string = req.params.rep;
  ID = uuidv4();
  const word: string | undefined = await loadWord(number, repeat);
  if (word != undefined) {
    secret = word.toLowerCase();
    res.json({ display: false, ID: ID });
  } else {
    res.json("error");
  }
  num = number;
  rep = repeat;
  time = Number(timer("start"));
  count = Number(counter("stop"));
  wordGuessed = [];
  console.log("word", word);
});

app.post("/game/guess/:guess/:id", (req, res) => {
  const guess = req.params.guess;
  const playerID = req.params.id;

  if (playerID === ID) {
    wordGuessed.push(guess);
    const result = checkGuess(guess, secret, time);

    stopTime = Number(result.stopTime);
    timeResult = Number(result.totalTime);
    count = Number(counter("start"));
    res.status(201).json({ result: result, time: timeResult, count: count });
  } else {
    res.status(404).end();
  }
});

app.post("/game/highscore/:playerID", async (req, res) => {
  try {
    const playerID = req.params.playerID;
    if (playerID === ID) {
      const sql = `INSERT INTO score(playerID, name, startTime, stopTime, time, count, gusses, letter, repeat) VALUES('${playerID}', $1::text,${time},${stopTime},${timeResult},${count},$2::text[],${num}, '${rep}')`;

      const values = [req.body.name, wordGuessed];
      const result = await pool.query(sql, values);

      res.status(201);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.get("/highscore", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM score");

    const highscore = result.rows;

    res.render("highscore", {
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
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.get("/game/highscore/number/:num", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM score WHERE letter = ${req.params.num}`
    );

    const scoreNum = result.rows;

    res.json({
      results: scoreNum.map((a) => {
        return {
          name: a.name,
          time: a.time,
          count: a.count,
          letter: a.letter,
          repeat: a.repeat,
        };
      }),
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.get("/game/highscore/repeat/:rep", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM score WHERE repeat = '${req.params.rep}'`
    );

    const scoreRep = result.rows;

    res.json({
      results: scoreRep.map((a) => {
        return {
          name: a.name,
          time: a.time,
          count: a.count,
          letter: a.letter,
          repeat: a.repeat,
        };
      }),
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.use("/static", express.static("static"));
app.use("/file", express.static("../frontend/dist"));

export default app;
