const webpack = require('../webpack.config.js');

module.exports = async ({ config, mode }) => {
  return { ...config, module: { ...config.module, rules: webpack.module.rules }, resolve: {
    extensions: ['.tsx', '.ts', '.js']
  } };
};
