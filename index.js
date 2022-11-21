const read = require("./src/read");
const write = require("./src/write");
const clear = require("./src/clear");
const _options = require("./src/options");

module.exports = { init: (options) => _options(options), write, read, clear };
