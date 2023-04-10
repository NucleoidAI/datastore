require("dotenv").config();
const app = require("./src/app");
const config = require("./src/config");
const { listen } = require("./src/event");

const { event } = config.init();

if (event) {
  setImmediate(async () => listen(event));
}

app.listen(process.env.PORT);
