const fs = require("fs");
const hash = require("./hash");
const genesis = require("./genesis");
const config = require("./config");

function clear() {
  const { path } = config();
  fs.rmSync(`${path}/data`, { recursive: true, force: true });
  fs.mkdirSync(`${path}/data`, { recursive: true });

  const ge = genesis();
  hash(ge);
}

module.exports = clear;
