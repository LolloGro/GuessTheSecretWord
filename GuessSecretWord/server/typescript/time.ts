export default function timer(run: string) {
  let startTime: number | undefined;

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
