module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: '3.4.0'
        }
      ],
      '@babel/preset-typescript'
    ]
  };
};
