const read = require("./read");

function tail(n = 10) {
  return read().reverse().slice(0, n);
}

module.exports = tail;
