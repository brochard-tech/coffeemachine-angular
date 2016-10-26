/**
 * Created by christophebrochard on 26/10/2016.
 */

var conf = require('./karma.conf');

module.exports = function(config) {
  conf.colors = true;
  conf.logLevel = config.LOG_DEBUG;
  conf.autoWatch = true;
  conf.singleRun = false;

  config.set(conf);
};