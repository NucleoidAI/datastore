// Change to app.spec.js
require("dotenv").config({ path: ".env.test" });
const { equal } = require("assert");

const request = require("supertest");
const app = require("../app");
const datastore = require("../datastore");
const { v4: uuid } = require("uuid");

const id = uuid();
const path = `${__dirname}/tmp`;

describe("Nucleoid Data Store Server", () => {
  before(() => datastore.init({ id, path }, true));
  beforeEach(() => datastore.clear());
  after(() => datastore.clear());

  it("returns hashes for given id", async () => {
    datastore.write({ test: "ABC" });
    const { status } = await request(app).get(`/data/${id}`).send();

    equal(status, 200);
  });

  it("returns 404 if id is invalid", async () => {
    datastore.write({ test: "DEF" });
    const { status } = await request(app).get("/data/12345678-abcd").send();

    equal(status, 404);
  });
});
