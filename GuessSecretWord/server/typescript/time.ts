export default function timer(run: string) {
  if (run === "start") {
    const startTime = Date.now();
    return startTime;
  }
}
