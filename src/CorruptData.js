class CorruptData extends Error {
  constructor() {
    super("Corrupt hash in data store");
  }
}

CorruptData.prototype.name = "CorruptData";
module.exports = CorruptData;
