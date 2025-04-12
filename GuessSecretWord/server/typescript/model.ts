import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  playerID: String,
  name: String,
  startTime: Number,
  stopTime: Number,
  time: Number,
  count: Number,
  gusses: Array,
  letter: Number,
  repeat: String,
});

const Result = mongoose.model("Result", resultSchema);

export { Result };
