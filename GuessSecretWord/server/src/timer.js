export default function timer(run, start) {
  if (run === "start") {
    const startTime = Date.now();
    return startTime;
  }
  if (run === "stop") {
    const stopTime = Date.now();
    const time = stopTime - start;
    const totalTime = Math.round(time / 1000);
    return totalTime;
  }
}
