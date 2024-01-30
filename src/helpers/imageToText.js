#!/usr/bin/env node
import ora from "ora";
import { API_URL, KEY_API } from "../constants.js";

export default async function imageToText(image) {
  try {
    async function query(filename) {
      const gitSpinner = ora("generating text from image ...").start();
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${KEY_API}`,
        },
        method: "POST",
        body: filename,
      });
      gitSpinner.succeed();
      const result = await response.json();
      return result;
    }

    const response = await query(image);
    return JSON.stringify(response[0].generated_text);
  } catch (error) {
    console.log(error);
  }
}
