const webpackConfig = require("./webpack.config");
const path = require('path');

delete webpackConfig.entry;

module.exports = (config) => {
  config.set({
    browsers: ["Chrome", "ChromeHeadless"],
    frameworks: ["mocha"],
    reporters: ["spec", 'coverage-istanbul'],
    files: [
      "tests/**/*.test.ts"
    ],
    preprocessors: {
      "tests/**/*.test.ts": ["webpack"]
    },
    mime: {
      "text/x-typescript": ["ts", "tsx"],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'text-summary', 'lcovonly' ],
      dir: path.join(__dirname, 'coverage'),
      fixWebpackSourcePaths: true,
      'report-config': {
        html: { outdir: 'html' }
      }
    },
    singleRun: true
  })
};
