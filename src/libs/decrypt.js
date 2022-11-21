const crypto = require("crypto");
const options = require("../options");

function decrypt(key, hash) {
  const { salt, algorithm } = options();
  const buffer = crypto.scryptSync(key, salt, 32);
  const parts = hash.split(":");
  const iv = Buffer.from(parts.shift(), "hex");
  const en = Buffer.from(parts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(buffer, "hex"),
    iv
  );

  let de = decipher.update(en);
  return Buffer.concat([de, decipher.final()]);
}

module.exports = decrypt;
