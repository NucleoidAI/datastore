const crypto = require("crypto");
const options = require("../options");

function encrypt(key, data) {
  const { salt, algorithm } = options();
  const buffer = crypto.scryptSync(key, salt, 32);

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(buffer, "hex"),
    iv
  );

  let en = cipher.update(JSON.stringify(data));
  en = Buffer.concat([en, cipher.final()]);
  return iv.toString("hex") + ":" + en.toString("hex");
}

module.exports = encrypt;
