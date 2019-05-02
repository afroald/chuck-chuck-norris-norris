const webpackConfig = require('./webpack.config');

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  rules: {
    'import/prefer-default-export': 0,
    'vue/html-self-closing': 'off',
    'vue/html-indent': ['error', 2, {
      'attribute': 2,
      'closeBracket': 0,
      'alignAttributesVertically': true,
    }]
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: webpackConfig,
      },
    },
  },
};
