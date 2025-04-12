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
exports.loadWord = loadWord;
const promises_1 = __importDefault(require("fs/promises"));
function loadWord(number, repeat) {
    return __awaiter(this, void 0, void 0, function* () {
        let wordList;
        try {
            const buf = yield promises_1.default.readFile("./data/secretWords.json");
            wordList = JSON.parse(buf.toString());
        }
        catch (error) {
            console.error("fel vid inläsning", error);
        }
        let sortedList;
        if (wordList != undefined) {
            sortedList = wordList.filter((word) => {
                if (word.length == number) {
                    return word;
                }
            });
        }
        if (sortedList != undefined) {
            if (sortedList.length == 0) {
                return;
            }
            const remove = [];
            if (repeat === "no") {
                for (let i = 0; i < sortedList.length; i++) {
                    let check = sortedList[i];
                    let checkedWord = /(\w).*\1/.test(check);
                    if (checkedWord == true) {
                        remove.push(check);
                    }
                }
            }
            else {
                const randomWordRep = sortedList[Math.floor(Math.random() * sortedList.length)];
                return randomWordRep;
            }
            const newLista = sortedList.filter((word) => !remove.includes(word));
            if (newLista.length == 0) {
                return;
            }
            else {
                const randomWord = newLista[Math.floor(Math.random() * newLista.length)];
                return randomWord;
            }
        }
    });
}
