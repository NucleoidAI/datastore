const crypto = require("crypto");
const fs = require("fs");
let hash;
const algorithm = "aes-256-ctr";

const key = "0c3Yc2KDj0rQWq9aJEnOGNzsNb4IrHPq";
const salt = "UqD4yJPYL5gkbJZsahPJItNiQYNoiN20";

let _options = {};

function init(options) {
  _options = options;
}

function write(data) {
  const buffer = crypto.scryptSync(hash || key, salt, 32);

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(buffer, "hex"),
    iv
  );

  let en = cipher.update(JSON.stringify(data));
  en = Buffer.concat([en, cipher.final()]);
  hash = iv.toString("hex") + ":" + en.toString("hex");

  const { id, path } = _options;
  fs.appendFileSync(`${path}/${id}`, `${hash}\n`);
}

function read() {
  const { id, path } = _options;
  // TODO Replace with stream
  const data = fs.readFileSync(`${path}/${id}`, "utf8");

  let hash = key;

  return data
    .trim()
    .split("\n")
    .map((line) => {
      const buffer = crypto.scryptSync(hash, salt, 32);
      hash = line;

      const parts = line.split(":");
      const iv = Buffer.from(parts.shift(), "hex");
      const en = Buffer.from(parts.join(":"), "hex");
      const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(buffer, "hex"),
        iv
      );

      let de = decipher.update(en);
      de = Buffer.concat([de, decipher.final()]);
      return JSON.parse(de.toString());
    });
}

function clear() {
  const { path } = _options;
  fs.rmSync(path, { recursive: true, force: true });
  fs.mkdirSync(path, { recursive: true });
}

module.exports = { init, write, read, clear };
