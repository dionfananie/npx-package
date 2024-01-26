const getFile = linkFile => {
  const relativeRegx = /\.\./gi;
  const relativeSlashRegx = /\.\.\//gi;
  const filePathArr = linkFile.split("/");

  const relativeLength = filePath2.match(relativeRegx)?.length || 0;
  const replaced = filePath2.replace(relativeSlashRegx, "");
  const fileArr = replaced.split("/");
  filePathArr.length = filePathArr.length - (relativeLength + 1);

  const newPath = [...filePathArr, ...fileArr];
  const newimg = newPath.join("/");
  console.log(newPath.join("/"));
  const data = fs.readFileSync(newimg);
  return data;
};
module.exports = getFile;
