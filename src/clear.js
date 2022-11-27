const fs = require("fs");
const options = require("./options");
const hash = require("./hash");
const genesis = require("./genesis");

function clear() {
  const { path } = options();
  fs.rmSync(path, { recursive: true, force: true });
  fs.mkdirSync(path, { recursive: true });

  const ge = genesis();
  hash(ge);
}

module.exports = clear;
