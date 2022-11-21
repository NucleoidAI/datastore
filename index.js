const read = require("./src/read");
const write = require("./src/write");
const clear = require("./src/clear");
const _options = require("./src/options");
const fs = require("fs");

function init(options) {
  const { path } = _options(options);

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

module.exports = { init, write, read, clear };
