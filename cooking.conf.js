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
        'last 3 versions',
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 6',
        'opera >= 12.1',
        'ios >= 6',
        'android >= 4.4',
        'bb >= 10',
        'and_uc 9.9'
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
