const fs = require("fs");
const decrypt = require("./lib/decrypt");
const CorruptHash = require("./CorruptHash");
const CorruptData = require("./CorruptData");
const genesis = require("./genesis");
const config = require("./config");

function read() {
  const {
    id,
    path,
    data: { key, encryption },
  } = config();

  if (fs.existsSync(`${path}/data/${id}`)) {
    // TODO Replace with stream
    const data = fs.readFileSync(`${path}/data/${id}`, "utf8");

    if (!encryption) {
      return data
        .trim()
        .split("\n")
        .map((line) => {
          try {
            return JSON.parse(line);
          } catch (err) {
            throw new CorruptData();
          }
        });
    }

    let hash = genesis();

    return data
      .trim()
      .split("\n")
      .map((line) => {
        const de = decrypt(`${hash}.${key}`, line);
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
