const fs = require("fs");
const home = require("os").homedir();

let defaultConfig = {
  path: `${home}/.nuc`,
  data: {
    encryption: true,
    key: "EOsDDQ1zovGCl0iTZUxRmrks1GM86jRX",
    algorithm: "aes-256-ctr",
  },
};

let _config = { ...defaultConfig };

module.exports = (config) => {
  if (config) {
    _config = { ...defaultConfig };
    _config = { ..._config, ...config };

    try {
      const json = require(`${_config.path}/config.json`);
      _config = { ..._config, ...json };
    } catch (err) {} // eslint-disable-line no-empty

    if (!fs.existsSync(_config.path)) {
      fs.mkdirSync(_config.path, { recursive: true });
    }

    if (!fs.existsSync(`${_config.path}/data`)) {
      fs.mkdirSync(`${_config.path}/data`, { recursive: true });
    }
  }

  return _config;
};
