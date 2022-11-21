let _options = {
  key: "0c3Yc2KDj0rQWq9aJEnOGNzsNb4IrHPq",
  salt: "UqD4yJPYL5gkbJZsahPJItNiQYNoiN20",
  algorithm: "aes-256-ctr",
};

module.exports = (options) => {
  if (options) {
    _options = { ..._options, ...options };
  }

  return _options;
};
