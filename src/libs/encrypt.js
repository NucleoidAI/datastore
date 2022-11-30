const crypto = require("crypto");
const options = require("../options");

function encrypt(key, data) {
  const { algorithm } = options();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    algorithm,
    crypto.createHash("md5").update(key).digest("hex"),
    iv
  );

  let en = cipher.update(JSON.stringify(data));
  en = Buffer.concat([en, cipher.final()]);
  return iv.toString("hex") + ":" + en.toString("hex");
}

module.exports = encrypt;
