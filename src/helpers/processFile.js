import getFile from "./getFile.js";
import imageToText from "./imageToText.js";
import fs from "fs-extra";
import { regImgExt, regQuote, regImgValue, regHtmlImg, regComment, refImgVar } from "../constants.js";

export default async function processFile(path, data) {
  let imgFiles = {};
  for (let idx = 0; idx < data.length; idx++) {
    const el = data[idx];
    const commented = el.match(regComment);
    if (el.match(regImgExt)?.length > 0 && !commented) {
      const varImg = el.match(refImgVar)[1];
      const refImg = el.match(regQuote)[0];
      if (varImg) {
        imgFiles = { ...imgFiles, [varImg.trim()]: refImg.replace(/"/gi, "") };
      }
    }
    const find = el.match(regHtmlImg);
    if (find?.length > 0 && !commented) {
      const sourceImg = find[1].match(regImgValue);
      if (sourceImg?.length > 0 && sourceImg[1] !== "") {
        const linkImage = imgFiles[sourceImg[1]];
        if (linkImage) {
          const filePathImage = getFile(path, linkImage);
          const dataImage = fs.readFileSync(filePathImage);
          const fileText = await imageToText(dataImage);
          const regAlt = new RegExp("alt", "ig");
          const findAlt = el.match(regAlt);
          if (findAlt?.length > 0) {
            var frontend1 = el.replace(/alt="(.*?)"/g, `alt=${fileText}`);
            data[idx] = frontend1;
          } else {
            const tagHtml = el.replace(/\/>/, `alt=${fileText} />`);
            data[idx] = tagHtml;
          }
        }
      }
    }
  }
  return data;
}
