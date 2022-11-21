const datastore = require("../datastore");
const { equal, notEqual, deepEqual, throws } = require("assert");
const uuid = require("uuid").v4;

datastore.init({
  id: uuid(),
  path: `${__dirname}/tmp`,
});

describe("Nucleoid Data Store", () => {
  before(() => datastore.clear());
  after(() => datastore.clear());

  it("handles valid data set", () => {
    const dataset = [{ test: "ABC" }, { test: 123 }, { test: [1, 2] }];
    dataset.forEach((data) => datastore.write(data));

    const result = datastore.read();
    deepEqual(result, dataset);
  });
});
