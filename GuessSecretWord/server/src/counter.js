let count = 0;

export default function counter(run) {
  if (run === "start") {
    count++;
    console.log("räknare", count);
    return count;
  } else {
    return count;
  }
}
