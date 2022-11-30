const crypto = require("crypto");
const options = require("../options");

function decrypt(key, hash) {
  const { algorithm } = options();
  const parts = hash.split(":");
  const iv = Buffer.from(parts.shift(), "hex");
  const en = Buffer.from(parts.join(":"), "hex");

  const decipher = crypto.createDecipheriv(
    algorithm,
    crypto.createHash("md5").update(key).digest("hex"),
    iv
  );

  let de = decipher.update(en);
  return Buffer.concat([de, decipher.final()]);
}

module.exports = decrypt;
