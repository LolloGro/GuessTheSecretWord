"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = timer;
function timer(run) {
    if (run === "start") {
        const startTime = Date.now();
        return startTime;
    }
}
