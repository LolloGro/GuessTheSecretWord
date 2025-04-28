"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const secretword_1 = require("./secretword");
const checkGuess_1 = __importDefault(require("./checkGuess"));
const time_1 = __importDefault(require("./time"));
const count_1 = __importDefault(require("./count"));
const uuid_1 = require("uuid");
const pg_1 = require("pg");
const app = (0, express_1.default)();
const pool = new pg_1.Pool({
    user: "postgres",
    password: "password",
});
function CreateTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield pool.query(`CREATE TABLE IF NOT EXISTS score(
      id SERIAL PRIMARY KEY, 
      playerID TEXT NOT NULL, 
      name TEXT NOT NULL, 
      startTime BIGINT NOT NULL, 
      stopTime BIGINT NOT NULL, 
      time INT NOT NULL, 
      count INT NOT NULL, 
      gusses TEXT[] NOT NULL, 
      letter INT NOT NULL, 
      repeat TEXT NOT NULL)`);
        }
        catch (err) {
            console.log("No database");
        }
    });
}
CreateTable();
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
app.post("/game/secretword/:num/:rep", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const number = Number(req.params.num);
    const repeat = req.params.rep;
    ID = (0, uuid_1.v4)();
    const word = yield (0, secretword_1.loadWord)(number, repeat);
    if (word != undefined) {
        secret = word.toLowerCase();
        res.json({ display: false, ID: ID });
    }
    else {
        res.json("error");
    }
    num = number;
    rep = repeat;
    time = Number((0, time_1.default)("start"));
    count = Number((0, count_1.default)("stop"));
    wordGuessed = [];
    console.log("word", word);
}));
app.post("/game/guess/:guess/:id", (req, res) => {
    const guess = req.params.guess;
    const playerID = req.params.id;
    if (playerID === ID) {
        wordGuessed.push(guess);
        const result = (0, checkGuess_1.default)(guess, secret, time);
        stopTime = Number(result.stopTime);
        timeResult = Number(result.totalTime);
        count = Number((0, count_1.default)("start"));
        res.status(201).json({ result: result, time: timeResult, count: count });
    }
    else {
        res.status(404).end();
    }
});
app.post("/game/highscore/:playerID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playerID = req.params.playerID;
        if (playerID === ID) {
            const sql = `INSERT INTO score(playerID, name, startTime, stopTime, time, count, gusses, letter, repeat) VALUES('${playerID}', $1::text,${time},${stopTime},${timeResult},${count},$2::text[],${num}, '${rep}')`;
            const values = [req.body.name, wordGuessed];
            const result = yield pool.query(sql, values);
            res.status(201);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).end();
    }
}));
app.get("/highscore", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query("SELECT * FROM score");
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
    }
    catch (err) {
        console.log(err);
        res.status(500).end();
    }
}));
app.get("/game/highscore/number/:num", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query(`SELECT * FROM score WHERE letter = ${req.params.num}`);
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
    }
    catch (err) {
        console.log(err);
        res.status(500).end();
    }
}));
app.get("/game/highscore/repeat/:rep", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query(`SELECT * FROM score WHERE repeat = '${req.params.rep}'`);
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
    }
    catch (err) {
        console.log(err);
        res.status(500).end();
    }
}));
app.use("/static", express_1.default.static("static"));
app.use("/file", express_1.default.static("../frontend/dist"));
exports.default = app;
