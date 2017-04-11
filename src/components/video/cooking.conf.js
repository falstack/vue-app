var path = require('path');
var cooking = require('cooking');
var autoprefixer = require('autoprefixer');

cooking.set({
  entry: {
    index: path.join(__dirname, 'index.js')
  },
  dist: path.join(__dirname, 'lib'),
  template: false,
  format: 'umd',
  moduleName: 'vueVideo',
  extractCSS: 'vueVideo.css',
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
  extends: ['vue2', 'sass', 'autoprefixer']
});

module.exports = cooking.resolve();
