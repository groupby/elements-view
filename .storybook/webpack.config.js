// const defaultConfig = require('@open-wc/demoing-storybook/default-storybook-webpack-config.js');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader')
      }
    ]
  });

  config.resolve.extensions.push('.ts');

  return config;
  // return defaultConfig({ config, transpilePackages: ['lit-html', 'lit-element', '@open-wc'] });
};
