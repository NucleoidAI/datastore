const uuid = require("uuid").v4;
const home = require("os").homedir();

let _options = {
  key: "0c3Yc2KDj0rQWq9aJEnOGNzsNb4IrHPq",
  salt: "UqD4yJPYL5gkbJZsahPJItNiQYNoiN20",
  algorithm: "aes-256-ctr",
};

let id, path;

module.exports = (options) => {
  if (options) {
    id = options.id || id || uuid();
    path = options.path || path || `${home}/.nuc/data`;
    _options = { ..._options, ...options, id, path };
  }

  return _options;
};
