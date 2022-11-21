const _options = require("./options");
const encrypt = require("./libs/encrypt");
const fs = require("fs");

let hash;

function write(data) {
  const { id, path, key } = _options();

  hash = encrypt(hash || key, data);
  fs.appendFileSync(`${path}/${id}`, `${hash}\n`);
}

module.exports = write;
