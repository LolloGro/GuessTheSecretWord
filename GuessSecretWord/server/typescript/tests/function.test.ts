import { loadWord } from "../secretword";
import checkGuess from "../checkGuess";
import mongoose from "mongoose";

jest.mock("../secretword");
const mockWord = loadWord as jest.Mock;

describe("Test guess response", () => {
  test("Should return correct response if guess is correct", async () => {
    mockWord.mockReturnValue("hello");
    const word: string | undefined = await loadWord(5, "yes");
    const time = Date.now();
    const secret = word;
    const guess = "hello";

    if (secret != undefined) {
      const result = checkGuess(guess, secret, time);
      expect(word).toBe("hello");
      expect(result.checkSecret).toEqual([
        { secret: "Correct", letter: "h" },
        { secret: "Correct", letter: "e" },
        { secret: "Correct", letter: "l" },
        { secret: "Correct", letter: "l" },
        { secret: "Correct", letter: "o" },
      ]);
    }
  });

  test("Should return correct response if guess is incorrect", async () => {
    mockWord.mockReturnValue("cykla");
    const word: string | undefined = await loadWord(5, "yes");
    const time = Date.now();
    const secret = word;
    const guess = "hallå";

    if (secret != undefined) {
      const result = checkGuess(guess, secret, time);
      expect(word).toBe("cykla");
      expect(result.checkSecret).toEqual([
        { secret: "Incorrect", letter: "h" },
        { secret: "Misplaced", letter: "a" },
        { secret: "Misplaced", letter: "l" },
        { secret: "Correct", letter: "l" },
        { secret: "Incorrect", letter: "å" },
      ]);
    }
  });
});
