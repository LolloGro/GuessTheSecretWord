import express from "express";
import { loadWord } from "./loadWord.js";

const app = express();

//middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/api/secretword/:num/:rep", async (req, res) => {
  const number = req.params.num;
  const repeat = req.params.rep;
  const word = await loadWord(number, repeat);
  res.send(word);
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

//express inbyggda hantering av statiska filer
app.use("/static", express.static("static"));

app.listen(5080, () => {
  console.log("server started on 5080");
});
