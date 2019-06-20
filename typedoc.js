const config = require('./scripts/typedoc.js');

 config["external-modulemap"] = ".*packages\/web-components/(@sfx\/[^\/]*)\/.*";

 module.exports = config;
