#!/usr/bin/env node
import ora from "ora";

const imageToText = image => {
  try {
    async function query(filename) {
      const gitSpinner = ora("generating text from image ...").start();
      // let data = await fetch(filename);
      // let fimgb = Buffer.from(await data.arrayBuffer());
      const response = await fetch(
        "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
        {
          headers: {
            Authorization: "Bearer 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",
          },
          method: "POST",
          body: image,
        },
      );
      gitSpinner.succeed();
      const result = await response.json();
      return result;
    }

    query(inputLink).then(response => {
      console.log(JSON.stringify(response[0].generated_text));
      return JSON.stringify(response[0].generated_text);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = imageToText;
