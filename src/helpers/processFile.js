import getFile from "./getFile.js";
import imageToText from "./imageToText.js";
import fs from "fs-extra";

export default async function processFile(path, data) {
  const regImgExt = /\.(gif|jpe?g|tiff?|png|webp|bmp)/i;
  const regQuote = /'|"(.*?)"|'/gi;
  const regImgSrc = /src={(.*?)}|'/gi;
  const regImgValue = /src={(.*?)}/;
  const regHtmlImg = /\<img (.*?)\/>/;
  const refImgVar = /import(.*?) from/;

  let imgFiles = {};
  for (let idx = 0; idx < data.length; idx++) {
    const el = data[idx];
    if (el.match(regImgExt)?.length > 0) {
      const varImg = el.match(refImgVar)[1];
      const refImg = el.match(regQuote)[0];
      if (varImg) {
        imgFiles = { [varImg.trim()]: refImg.replace(/"/gi, "") };
      }
    }
    const find = el.match(regHtmlImg);
    if (find?.length > 0) {
      const sourceImg = find[1].match(regImgValue);
      if (sourceImg?.length > 0 && sourceImg[1] !== "") {
        const linkImage = imgFiles[sourceImg[1]];
        const filePathImage = getFile(path, linkImage);
        const dataImage = fs.readFileSync(filePathImage);
        const fileText = await imageToText(dataImage);
        // console.log("value: ", imgFiles[sourceImg[1]]);
        console.log("fileText: ", fileText);
      }
      const regAlt = new RegExp("alt", "ig");
      const findAlt = el.match(regAlt);
      console.log("hehe");
      // if (findAlt?.length > 0) {
      //   var frontend1 = el.replace(/alt="(.*?)"/g, `alt='hello'`);
      //   // console.log("match alt: ", frontend1);
      // } else {
      //   const tagHtml = el.replace(/\/>/, "alt='hehe' />");
      //   // console.log(tagHtml);
      // }
    }
  }
  // console.log("imgArr: ", imgArr);
}

// module.exports = processFile;
// export default processFile;
