#!/usr/bin/env node
import ora from "ora";

export default async function imageToText(image) {
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
          body: filename,
        },
      );
      gitSpinner.succeed();
      const result = await response.json();
      return result;
    }

    query(image).then(response => {
      console.log(response);
      return JSON.stringify(response[0].generated_text);
    });
  } catch (error) {
    console.log(error);
  }
}
