let _hash;

module.exports = (hash) => {
  if (hash !== undefined) {
    _hash = hash;
  }

  return _hash;
};
