#!/usr/bin/env node
import promptSync from "prompt-sync";
import fs from "fs-extra";
import processFile from "../src/helpers/processFile.js";

// let inputLink = "";
// if (process.argv.length < 3) {
//   const prompt = promptSync();
//   inputLink = prompt("Input your file link here: ");
// } else {
//   inputLink = process.argv[2];
// }
// console.log("asasa", process.cwd());
// const trimLink = inputLink.replace(/[']+/g, "");
const trimLink = "/Users/dion.fananie/Documents/Works/npx-package/src/try.js";

try {
  const data = fs.readFileSync(trimLink);
  await processFile(trimLink, data.toString().split("\n"));
} catch (error) {
  console.log(error);
}
