let count = 0;

export default function counter(run) {
  if (run === "start") {
    count++;
    return count;
  }
  if (run === "stop") {
    count = 0;
    return count;
  }
}
