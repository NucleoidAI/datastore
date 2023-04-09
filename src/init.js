const fs = require("fs");
const hash = require("./hash");
const setConfig = require("./config");

function init(config = {}, clear = false) {
  const { id, path } = setConfig(config);

  if (!id) {
    console.error("No id provided");
    process.exit(1);
  }

  if (fs.existsSync(`${path}/data/${id}`)) {
    // TODO Replace with stream
    const data = fs.readFileSync(`${path}/data/${id}`, "utf8");
    const last = data.trim().split("\n").pop();
    hash(last);
  }

  if (clear) {
    require("./clear")();
  }
}

module.exports = init;
