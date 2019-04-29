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
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
