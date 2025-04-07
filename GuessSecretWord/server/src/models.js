import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  name: String,
  time: Number,
  count: Number,
  letter: Number,
  reapeat: String,
});

const Result = mongoose.model("Result", resultSchema);

export { Result };
