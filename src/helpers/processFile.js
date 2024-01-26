const processFile = data => {
  const regImg = new RegExp("<img", "ig");
  for (let idx = 0; idx < data.length; idx++) {
    const el = data[idx];
    const find = el.match(regImg);
    if (find?.length > 0) {
      const regAlt = new RegExp("alt", "ig");
      const findAlt = el.match(regAlt);
      console.log("match img: ", el);
      if (findAlt?.length > 0) {
        var frontend1 = el.replace(/alt="(.*?)"/g, `alt='hello'`);
        console.log("match alt: ", frontend1);
      }
    }
  }
};

module.exports = processFile;
// export default processFile;
