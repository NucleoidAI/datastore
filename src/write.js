const fs = require("fs");
const hash = require("./hash");
const encrypt = require("./lib/encrypt");
const config = require("./config");

function write(data) {
  const {
    id,
    path,
    data: { key, encryption },
  } = config();

  if (encryption) {
    const en = encrypt(`${hash()}.${key}`, data);
    fs.appendFileSync(`${path}/data/${id}`, `${en}\n`);
    hash(en);
    return en;
  } else {
    fs.appendFileSync(`${path}/data/${id}`, `${data}\n`);
    return data;
  }
}

module.exports = write;
