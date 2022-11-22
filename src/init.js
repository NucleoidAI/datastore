const _options = require("./options");
const fs = require("fs");
const clear = require("./clear");
const hash = require("./hash");

function init(options) {
  const { id, path } = _options(options);

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  if (fs.existsSync(`${path}/${id}`)) {
    // TODO Replace with stream
    const data = fs.readFileSync(`${path}/${id}`, "utf8");
    const last = data.trim().split("\n").pop();
    hash(last);
  }

  if (options.clear) {
    clear();
    _options({ clear: false });
  }
}

module.exports = init;
