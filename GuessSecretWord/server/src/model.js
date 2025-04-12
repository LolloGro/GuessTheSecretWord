"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const resultSchema = new mongoose_1.default.Schema({
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
const Result = mongoose_1.default.model("Result", resultSchema);
exports.Result = Result;
