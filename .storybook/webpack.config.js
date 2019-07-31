const webpack = require('../webpack.config.js');
const path = require('path');

module.exports = async ({ config, mode }) => {
  return {
    ...config,
    module: {
      ...config.module,
      rules: webpack.module.rules
    },
    resolve: webpack.resolve
  };
};
