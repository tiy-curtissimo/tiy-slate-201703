var files, settings,
  _ = require('lodash');

files = [
  'test/setup.js',
  // Globals as defined in gulp scripts task. Todo: put these in one place.
  'node_modules/lodash/lodash.min.js',
  'node_modules/eventify/dist/eventify.min.js',
  'node_modules/dollar-slice/index.js',
  'node_modules/js-md5/build/md5.min.js',
  'node_modules/fingerprintjs2/dist/fingerprint2.min.js',
  'global/js/lib/**',
  'global/js/values.js',
  'global/js/*.js', // testing global js
  'components/*/template.nunjucks' // preprocess nunjucks templates
];

settings = {
  autoWatch: false,
  browserify: {
    debug: true
  },
  colors: true,
  singleRun: true,
  reporters: ['dots'],
  files: files,
  frameworks: ['mocha', 'chai', 'sinon', 'browserify', 'nunjucks'],
  preprocessors: {
    'global/js/*.js': ['browserify'],
    'components/*/template.nunjucks': ['html2js']
  },
  plugins: [
    'karma-browserify',
    'karma-browserstack-launcher',
    'karma-chai',
    'karma-chrome-launcher',
    'karma-coverage',
    'karma-firefox-launcher',
    'karma-nunjucks',
    'karma-mocha',
    'karma-safari-launcher',
    'karma-sinon',
    'karma-html2js-preprocessor'
  ]
};

module.exports = function (karma) {
  karma.set(_.assign(settings, {
    browsers: ['chrome'],
    // give browserstack some time
    browserDisconnectTimeout: 5000,
    browserNoActivityTimeout: 50000
  }));
};

module.exports.files = files;
module.exports.settings = settings;
