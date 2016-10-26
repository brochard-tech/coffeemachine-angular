/**
 * Created by christophebrochard on 26/10/2016.
 */

var path                = require('path');
var webpack             = require('webpack');


module.exports = {
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'app.js'
  },

  entry: path.join(__dirname, '../public/app/index.js'),
  target: 'web',

  resolve: {
    extensions: ['', '.js']
  }

  /*plugins: [
    new webpack.optimize.UglifyJsPlugin({
     compress: { warnings: false }
     })
  ],*/

  //devtool: 'source-map'
};