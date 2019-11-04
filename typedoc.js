const config = require('./scripts/config/typedoc.js');

 config["external-modulemap"] = ".*packages\/web-components\/(@groupby\/[^\/]*)\/.*";

 module.exports = config;
