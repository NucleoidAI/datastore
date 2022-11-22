const fs = require("fs");
const decrypt = require("./libs/decrypt");
const options = require("./options");

function read() {
  const { id, path, key } = options();

  if (fs.existsSync(`${path}/${id}`)) {
    // TODO Replace with stream
    const data = fs.readFileSync(`${path}/${id}`, "utf8");

    let hash = key;

    return data
      .trim()
      .split("\n")
      .map((line) => {
        const de = decrypt(hash, line);
        hash = line;
        return JSON.parse(de.toString());
      });
  } else {
    return [];
  }
}

module.exports = read;
