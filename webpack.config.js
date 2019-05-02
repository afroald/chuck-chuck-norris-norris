const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

module.exports = {
  mode: 'development',
  context: SRC_DIR,
  resolve: {
    alias: {
      '~': SRC_DIR,
    },
  },
  entry: './main',
  output: {
    path: path.resolve(PUBLIC_DIR, 'assets'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:8]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
