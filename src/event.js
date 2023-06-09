const { Kafka } = require("kafkajs");
const fs = require("fs");
const config = require("./config");

async function listen() {
  const { path, event } = config();

  const kafka = new Kafka({
    clientId: "datastore",
    brokers: event.brokers,
  });

  const consumer = kafka.consumer({ groupId: "datastore" });
  await consumer.connect();

  await consumer.subscribe({ topic: "DATA" });
  await consumer.run({
    eachMessage: ({ message }) => {
      const { id, hash } = JSON.parse(message.value.toString());
      fs.appendFileSync(`${path}/data/${id}.dat`, `${hash}\n`);
    },
  });
}

module.exports = { listen };
