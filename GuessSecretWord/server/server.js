"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_handlebars_1 = require("express-handlebars");
const secretword_js_1 = require("./src/secretword.js");
const check_js_1 = __importDefault(require("./src/check.js"));
const time_js_1 = __importDefault(require("./src/time.js"));
const count_js_1 = __importDefault(require("./src/count.js"));
const model_js_1 = require("./src/model.js");
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.engine("handlebars", (0, express_handlebars_1.engine)());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express_1.default.json());
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
app.post("/game/secretword/:num/:rep", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const number = Number(req.params.num);
    const repeat = req.params.rep;
    ID = (0, uuid_1.v4)();
    const word = yield (0, secretword_js_1.loadWord)(number, repeat);
    if (word != undefined) {
      secret = word.toLowerCase();
      res.json({ display: false, ID: ID });
    } else {
      res.json("error");
    }
    num = number;
    rep = repeat;
    time = (0, time_js_1.default)("start");
    count = (0, count_js_1.default)("stop");
    wordGuessed = [];
    console.log("word", word);
  })
);
app.post("/game/guess/:guess/:id", (req, res) => {
  const guess = req.params.guess;
  const playerID = req.params.id;
  if (playerID === ID) {
    wordGuessed.push(guess);
    const result = (0, check_js_1.default)(guess, secret);
    timeResult = (0, time_js_1.default)("stop");
    stopTime = result.stopTime;
    count = (0, count_js_1.default)("start");
    res.status(201).json({ result: result, time: timeResult, count: count });
  } else {
    res.status(404).end();
  }
});
app.post("/game/highscore/:playerID", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect("mongodb://localhost:27017/highscore");
    const playerID = req.params.playerID;
    if (playerID === ID) {
      const newResult = new model_js_1.Result({
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
      yield newResult.save();
      res.status(201);
    } else {
      res.status(404).end();
    }
  })
);
app.get("/highscore", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect("mongodb://localhost:27017/highscore");
    const result = yield model_js_1.Result.find();
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
  })
);
app.get("/game/highscore/number/:num", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect("mongodb://localhost:27017/highscore");
    const number = req.params.num;
    const highscore = yield model_js_1.Result.find({ letter: number });
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
  })
);
app.get("/game/highscore/repeat/:rep", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect("mongodb://localhost:27017/highscore");
    const repeat = req.params.rep;
    const score = yield model_js_1.Result.find({ repeat: repeat });
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
  })
);
app.use("/static", express_1.default.static("static"));
app.use("/file", express_1.default.static("../frontend/dist"));
app.listen(5080, () => {
  console.log("server started on 5080");
});
