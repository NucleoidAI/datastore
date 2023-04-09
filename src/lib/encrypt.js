const crypto = require("crypto");
const config = require("../config");

function encrypt(key, data) {
  const {
    data: { algorithm },
  } = config();
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
