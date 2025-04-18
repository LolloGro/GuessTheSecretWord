import app from "../app";
import request from "supertest";

describe("Test response", () => {
  test("Should return status 200", async () => {
    const response = await request(app).get("/info");
    expect(response.status).toBe(200);
  });

  test("ID should be defined", async () => {
    const response = await request(app).post("/game/secretword/5/yes");
    expect(response.body.ID).toBeDefined();
  });
});
