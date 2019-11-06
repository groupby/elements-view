const webpackConfig = require('../webpack.config');
const path = require('path');

delete webpackConfig.entry;
webpackConfig.module.rules.splice(0, 1, {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  exclude: [/node_modules/]
});

module.exports = function createDefaultConf() {
  return {
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage-istanbul'],
    files: [
      'test/*.ts',
    ],
    preprocessors: {
      'test/**/*.ts': ['webpack'],
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },
    coverageIstanbulReporter: {
      reports: ['html', 'text-summary', 'lcovonly'],
      dir: path.join(__dirname, 'coverage'),
      fixWebpackSourcePaths: true,
      'report-config': {
        html: { outdir: 'html' },
      },
    },
    singleRun: true,
  };
}
