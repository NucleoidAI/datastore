const fs = require("fs");
const options = require("./options");
const hash = require("./hash");

function clear() {
  const { path } = options();
  fs.rmSync(path, { recursive: true, force: true });
  fs.mkdirSync(path, { recursive: true });
  hash(null);
}

module.exports = clear;
