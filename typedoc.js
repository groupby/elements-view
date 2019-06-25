const config = require('./scripts/config/typedoc.js');

 config["external-modulemap"] = ".*packages\/web-components\/(@sfx\/[^\/]*)\/.*";

 module.exports = config;
