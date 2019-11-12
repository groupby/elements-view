module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript',
    ],
    sourceType: 'unambiguous',
    plugins: ["@babel/plugin-transform-runtime", ],
  };
};
