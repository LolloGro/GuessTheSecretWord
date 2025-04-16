let count: number = 0;

export default function counter(run: string) {
  if (run === "start") {
    count++;
    return count;
  }
  if (run === "stop") {
    count = 0;
    return count;
  }
}
