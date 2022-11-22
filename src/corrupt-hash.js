class CorruptHash extends Error {
  constructor() {
    super("Corrupt hash in data store");
  }
}

CorruptHash.prototype.name = "CorruptHash";

module.exports = CorruptHash;
