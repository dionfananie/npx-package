#!/usr/bin/env node
import promptSync from "prompt-sync";
import ora from "ora";
import fs from "fs-extra";
import processFile from "../src/helpers/processFile.js";

let inputLink = "";
if (process.argv.length < 3) {
  const prompt = promptSync();
  inputLink = prompt("Input your file link here: ");
} else {
  inputLink = process.argv[2];
}

const trimLink = inputLink.replace(/[']+/g, "");

try {
  let gitSpinner = ora("read file ...").start();
  const data = fs.readFileSync(trimLink);
  gitSpinner.succeed();

  const htmlParsed = await processFile(trimLink, data.toString().split("\n"));
  const htmlTag = htmlParsed.join("\n");

  gitSpinner = ora("writing file ...").start();
  fs.writeFileSync(trimLink, htmlTag);
  gitSpinner.succeed("Done!");
} catch (error) {
  // gitSpinner.error();
  console.log(error);
}
