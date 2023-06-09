const express = require("express");
const compression = require("compression");
const Joi = require("joi");
const { argv } = require("yargs");
const config = require("./config");

const app = express();
app.use(compression());

app.get("/data/:id", (req, res) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const { id } = Joi.attempt(req.params, schema);

  const { path } = config();

  // TODO Convert to gzip encoding
  res.download(`${path}/data/${id}.dat`);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.code === "ENOENT") {
    res.status(404).end();
  } else {
    res.status(500).send(err);
  }
});

module.exports = app;
