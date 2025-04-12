import loadPages from "./app.js";

const app = loadPages();

app.listen(5080, () => {
  console.log("server started on 5080");
});
