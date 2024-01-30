export default function getFile(linkFile, linkImage) {
  const relativeRegx = /\.\./gi;
  const relativeSlashRegx = /\.\.\//gi;
  const filePathArr = linkFile.split("/");

  const relativeLength = linkImage.match(relativeRegx)?.length || 0;
  const replaced = linkImage.replace(relativeSlashRegx, "");
  const fileArr = replaced.split("/");
  filePathArr.length = filePathArr.length - (relativeLength + 1);

  const newPath = [...filePathArr, ...fileArr];
  const newimg = newPath.join("/");
  return newimg;
}
