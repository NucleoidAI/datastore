const fs = require("fs");
const decrypt = require("./libs/decrypt");
const options = require("./options");
const CorruptHash = require("./corrupt-hash");

function read() {
  const { id, path, key } = options();

  if (fs.existsSync(`${path}/${id}`)) {
    // TODO Replace with stream
    const data = fs.readFileSync(`${path}/${id}`, "utf8");

    let hash;

    return data
      .trim()
      .split("\n")
      .map((line) => {
        const de = decrypt(hash ? hash + ":" + key : key, line);
        hash = line;

        try {
          return JSON.parse(de.toString());
        } catch (err) {
          throw new CorruptHash();
        }
      });
  } else {
    return [];
  }
}

module.exports = read;
