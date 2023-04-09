const datastore = require("../datastore");
const { deepEqual, throws } = require("assert");
const fs = require("fs");
const CorruptHash = require("../CorruptHash");
const { v4: uuid } = require("uuid");

const id = uuid();
const path = `${__dirname}/tmp`;

describe("Nucleoid Data Store", () => {
  before(() => datastore.init({ id, path }, true));
  beforeEach(() => datastore.clear());
  after(() => datastore.clear());

  it("writes and reads data set", () => {
    const dataset = [{ test: "ABC" }, { test: 123 }, { test: [1, 2] }];
    dataset.forEach((data) => datastore.write(data));

    const result = datastore.read();
    deepEqual(result, dataset);
  });

  it("tails last n statements", () => {
    const dataset = [{ test: 456 }, { test: "TEST" }];
    dataset.forEach((data) => datastore.write(data));

    const result = datastore.tail();
    deepEqual(result, dataset.reverse());
  });

  it("continues writing after restart", () => {
    const dataset1 = [{ test: "ABC" }, { test: [1, 2] }];
    dataset1.forEach((data) => datastore.write(data));
    datastore.init({ id, path }, false);

    const dataset2 = [{ test: "DEF" }, { test: [3, 4] }];
    dataset2.forEach((data) => datastore.write(data));

    const result = datastore.read();
    deepEqual(result, dataset1.concat(dataset2));
  });

  it("returns empty array if data store does not exist yet", () => {
    const result = datastore.read();
    deepEqual(result, []);
  });

  it("throws error if any hash is missing", () => {
    const dataset = [{ test: "XYZ" }, { test: 1 }, { test: true }];
    dataset.forEach((data) => datastore.write(data));

    const data = fs.readFileSync(`${path}/data/${id}`, "utf8");
    const updated = data.trim().split("\n");
    updated.splice(1, 1);
    fs.writeFileSync(`${path}/data/${id}`, updated.join("\n"));

    throws(() => datastore.read(), CorruptHash);
  });

  it("throws error if any hash is changed", () => {
    const dataset = [{ test: "XYZ" }, { test: 1 }, { test: true }];
    dataset.forEach((data) => datastore.write(data));

    const data = fs.readFileSync(`${path}/data/${id}`, "utf8");
    const updated = data.trim().split("\n");
    updated[1] += "x";
    fs.writeFileSync(`${path}/data/${id}`, updated.join("\n"));

    throws(() => datastore.read(), CorruptHash);
  });
});
