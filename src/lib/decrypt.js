const crypto = require("crypto");
const config = require("../config");

function decrypt(key, hash) {
  const {
    data: { algorithm },
  } = config();
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
