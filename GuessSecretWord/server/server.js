"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./src/app.js"));
app_js_1.default.listen(5080, () => {
  console.log("server started on 5080");
});
