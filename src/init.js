const fs = require("fs");
const hash = require("./hash");

function init(config = {}, clear = false) {
  const { id, path } = require("./config").init(config);

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
