const createDefaultConf = require('./test-tools/default.karma.conf');

module.exports = (config) => {
  const conf = createDefaultConf();
  conf.files.push('test/interaction/**/*.test.ts');

  config.set(conf);
};
