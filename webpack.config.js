const webpack = require('webpack');
var SRC_DIR = __dirname + '/client/src';
var DIST_DIR = __dirname + '/client/dist';

module.exports = {
  entry: {
    main: `${SRC_DIR}/index.jsx`
  },
  output: {
    filename: '[name].bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ]
};
