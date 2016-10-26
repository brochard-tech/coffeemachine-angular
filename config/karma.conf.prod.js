/**
 * Created by christophebrochard on 26/10/2016.
 */

var conf = require('./karma.conf');

module.exports = function(config) {
  conf.colors = true;
  conf.logLevel = config.LOG_INFO;
  conf.autoWatch = false;
  conf.singleRun = true;

  config.set(conf);
};