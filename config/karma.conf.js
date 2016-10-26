/**
 * Created by christophebrochard on 17/10/2016.
 */

var path = require('path');

module.exports = {
  // Configuration
  basePath: './../',
  frameworks: ['jasmine'],
  plugins: [
    require('karma-jasmine'),
    require('karma-coverage'),
    require('karma-phantomjs-launcher')
  ],
  files: [
    'public/vendors/angular.min.js',
    'public/vendors/angular-mocks.js',
    'public/app/**/*.js',
    'public/test/**/*.js'
  ],

  exclude: ['/node_modules/'],

  // Preprocessors
  preprocessors: {
    'public/app/**/*.js': ['coverage']
  },

  // Browsers
  browsers: ['PhantomJS'],
  phantomjsLauncher: {
    exitOnResourceError: true // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
  },

  // Reporters
  reporters: ['progress', 'coverage'],
  coverageReporter: {
    type: 'html',
    dir: 'public/coverage',
    instrumenterOptions: {
      istanbul: { noCompact: true }
    }
  },

  port: 9876
};