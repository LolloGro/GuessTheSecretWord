"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = counter;
let count = 0;
function counter(run) {
    if (run === "start") {
        count++;
        return count;
    }
    if (run === "stop") {
        count = 0;
        return count;
    }
}
