const uuid = require("uuid").v4;
const home = require("os").homedir();

let _options = {
  key: "EOsDDQ1zovGCl0iTZUxRmrks1GM86jRX",
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
