import express from "express";

const app = express();

//middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/api/secretword", (req, res) => {
  res.json({
    word: [
      "alla",
      "stol",
      "bok",
      "skrivbord",
      "aj",
      "kanske",
      "lite",
      "mycket",
      "ajabaja",
    ],
  });
});

const highscore = [];

app.post("/api/results", (res, res) => {
  const newResult = {
    name: req.body.name,
    time: req.body.time,
    count: req.body.count,
    letter: req.body.letters,
    reapeat: req.body.reapeat,
  };
  highscore.push(newResult);

  res.statusCode(201).json({ data: newResult });
});

app.use(express.json());

app.listen(5080);
