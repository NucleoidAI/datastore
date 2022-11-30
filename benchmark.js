const datastore = require("@nucleoidjs/datastore");

datastore.init();

const bw = Date.now();
for (let i = 0; i < 1_000_000; i++) {
  datastore.write({ test: i });
}
const aw = Date.now();
console.log(aw - bw);

const br = Date.now();
const data = datastore.read();
const ar = Date.now();
console.log(ar - br);

console.log(data);
