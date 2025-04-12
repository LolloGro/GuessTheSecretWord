"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = timer;
function timer(run) {
    let startTime;
    if (run === "start") {
        startTime = Date.now();
        return startTime;
    }
    if (run === "stop") {
        const stopTime = Date.now();
        if (startTime != undefined) {
            const time = stopTime - startTime;
            const totalTime = Math.round(time / 1000);
            return totalTime;
        }
    }
}
