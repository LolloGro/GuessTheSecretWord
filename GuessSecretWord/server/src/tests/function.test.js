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
const secretword_1 = require("../secretword");
const checkGuess_1 = __importDefault(require("../checkGuess"));
jest.mock("../secretword");
const mockWord = secretword_1.loadWord;
describe("Test guess response", () => {
    test("Should return correct response if guess is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        mockWord.mockReturnValue("hello");
        const word = yield (0, secretword_1.loadWord)(5, "yes");
        const time = Date.now();
        const secret = word;
        const guess = "hello";
        if (secret != undefined) {
            const result = (0, checkGuess_1.default)(guess, secret, time);
            expect(word).toBe("hello");
            expect(result.checkSecret).toEqual([
                { secret: "Correct", letter: "h" },
                { secret: "Correct", letter: "e" },
                { secret: "Correct", letter: "l" },
                { secret: "Correct", letter: "l" },
                { secret: "Correct", letter: "o" },
            ]);
        }
    }));
    test("Should return correct response if guess is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        mockWord.mockReturnValue("cykla");
        const word = yield (0, secretword_1.loadWord)(5, "yes");
        const time = Date.now();
        const secret = word;
        const guess = "hallå";
        if (secret != undefined) {
            const result = (0, checkGuess_1.default)(guess, secret, time);
            expect(word).toBe("cykla");
            expect(result.checkSecret).toEqual([
                { secret: "Incorrect", letter: "h" },
                { secret: "Misplaced", letter: "a" },
                { secret: "Misplaced", letter: "l" },
                { secret: "Correct", letter: "l" },
                { secret: "Incorrect", letter: "å" },
            ]);
        }
    }));
});
