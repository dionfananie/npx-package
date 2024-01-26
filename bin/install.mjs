#!/usr/bin/env node
import ora from "ora";
import promptSync from "prompt-sync";

let inputLink = "";
if (process.argv.length < 3) {
  const prompt = promptSync();
  inputLink = prompt("Input your image link here: ");
} else {
  inputLink = process.argv[2];
}

try {
  async function query(filename) {
    const gitSpinner = ora("generating text from image ...").start();
    let data = await fetch(filename);
    let fimgb = Buffer.from(await data.arrayBuffer());
    const response = await fetch("https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large", {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: fimgb,
    });
    gitSpinner.succeed();
    const result = await response.json();
    return result;
  }

  query(inputLink).then(response => {
    console.log(JSON.stringify(response[0].generated_text));
  });
} catch (error) {
  console.log(error);
}
