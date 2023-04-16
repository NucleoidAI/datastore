const Mock = require("@nucleoidjs/kafkajs-mock");
const { equal } = require("assert");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const datastore = require("../datastore");

const { listen } = require("../event");

const id = uuid();
const path = `${__dirname}/tmp`;

describe("Event listener", () => {
  before(() =>
    datastore.init(
      {
        id,
        path,
        event: {
          brokers: ["test"],
        },
      },
      true
    )
  );
  beforeEach(() => datastore.clear());
  after(() => datastore.clear());

  it("stores hash for given id", async () => {
    const kafka = new Mock.Kafka({
      clientId: "mock-client-1",
      brokers: ["test"],
    });
    const producer = kafka.producer();
    await producer.connect();
    await listen();
    await producer.send({
      topic: "DATA",
      messages: [{ value: JSON.stringify({ id, hash: "123" }) }],
    });
    const hash = fs.readFileSync(`${path}/data/${id}`, "utf8").trim();
    equal(hash, "123");
  });
});
