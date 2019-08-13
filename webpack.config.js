const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  entry: {
    components: './presets/components.ts',
  },

  devtool: 'source-map',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [new webpack.ProgressPlugin()],

  module: {
    rules: [
      {
        test: /.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.ts$/,
        exclude: [ path.resolve(__dirname, "tests") ],
        enforce: 'post',
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        }
      }
    ]
  },

  optimization: {
    // runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },

  devServer: {
    open: true
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}
