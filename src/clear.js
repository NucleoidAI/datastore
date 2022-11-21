const options = require("./options");
const fs = require("fs");

function clear() {
  const { path } = options();
  fs.rmSync(path, { recursive: true, force: true });
  fs.mkdirSync(path, { recursive: true });
}

module.exports = clear;
