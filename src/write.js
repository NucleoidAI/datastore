const fs = require("fs");
const hash = require("./hash");
const options = require("./options");
const encrypt = require("./libs/encrypt");

function write(data) {
  const { id, path, key } = options();

  const en = encrypt(hash() || key, data);
  hash(en);
  fs.appendFileSync(`${path}/${id}`, `${en}\n`);
}

module.exports = write;
