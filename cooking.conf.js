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
  hash: true,
  sourceMap: true,
  minimize: true,
  chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    require('autoprefixer')({
      browsers: [
        'ie >= 8',
        'ie_mob >= 10',
        'ff >= 26',
        'chrome >= 30',
        'safari >= 6',
        'opera >= 23',
        'ios >= 5',
        'android >= 2.3',
        'bb >= 10'
      ]
    })
  ],
  publicPath: '/dist/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  static: true,
  extractCSS: '[name].[contenthash:7].css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue2', 'sass', 'autoprefixer']
});

module.exports = cooking.resolve();
