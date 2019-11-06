const webpack = require('../webpack.config.js');

webpack.module.rules.splice(0, 1, {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  exclude: [/node_modules/]
});

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
