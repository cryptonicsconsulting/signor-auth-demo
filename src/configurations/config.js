exports.config = function () {
  var envJSON = require("./env.variables.json")
  var node_env = "development"

  let config = envJSON[node_env]

  config.PORT = config.PORT
  return config
};
