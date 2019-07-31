const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  entry: {
    components: [
      './presets/components.ts',
      './presets/themes/sfx-bold-theme.scss',
      './presets/themes/sfx-elegant-theme.scss',
    ],

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
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            // loader: 'style-loader',
            loader: 'file-loader',
            options: {
              name: '[name].css',
            },
          },
          'extract-loader',
          'css-loader?-url',
          'sass-loader'
        ]
      }
    ]
  },

  optimization: {
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
