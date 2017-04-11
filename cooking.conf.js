var path = require('path');
var cooking = require('cooking');
var autoprefixer = require('autoprefixer');

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  dist: './dist',
  template: './index.tpl',

  devServer: {
    port: 8080,
    publicPath: '/'
  },

  // production
  clean: true,
  hash: false,
  sourceMap: false,
  minimize: true,
  chunk: false, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    require('autoprefixer')({
      browsers: [
        'ie >= 9',
        'ff >= 45',
        'chrome >= 56',
        'safari >= 8',
        'ios >= 8.4',
        'android >= 4.4'
      ]
    })
  ],
  publicPath: '/dist/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  static: true,
  extractCSS: '[name].css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue2', 'sass', 'autoprefixer']
});

module.exports = cooking.resolve();
