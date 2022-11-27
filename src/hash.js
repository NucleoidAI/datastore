const genesis = require("./genesis");

let _hash = genesis();

module.exports = (hash) => {
  if (hash !== undefined) {
    _hash = hash;
  }

  return _hash;
};
