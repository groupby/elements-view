module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            chrome: '58',
            ie: '11'
          }
        },
        '@babel/preset-typescript'
      ]
    ]
  };
};
