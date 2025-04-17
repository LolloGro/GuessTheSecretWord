import supertest from "supertest";
import app from "../app";
import { response } from "express";

describe("res 200 when sends a guess", () => {
  test("guess", async () => {
    const res = await app.get("/info");
  });
  expect(response.statusCode).toBe(200);
});
