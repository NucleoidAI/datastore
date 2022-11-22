const datastore = require("../../index");
const { equal, notEqual, deepEqual, throws } = require("assert");
const uuid = require("uuid").v4;

datastore.init({
  id: uuid(),
  path: `${__dirname}/tmp`,
  clear: true,
});

describe("Nucleoid Data Store", () => {
  beforeEach(() => datastore.clear());
  after(() => datastore.clear());

  it("writes and reads data set", () => {
    const dataset = [{ test: "ABC" }, { test: 123 }, { test: [1, 2] }];
    dataset.forEach((data) => datastore.write(data));

    const result = datastore.read();
    deepEqual(result[0], dataset[0]);
    deepEqual(result[1], dataset[1]);
    deepEqual(result[2], dataset[2]);
  });

  it("tails last n statements", () => {
    const dataset = [{ test: 456 }, { test: "TEST" }];
    dataset.forEach((data) => datastore.write(data));

    const result = datastore.tail();
    deepEqual(result[0], dataset[1]);
    deepEqual(result[1], dataset[0]);
  });
});
