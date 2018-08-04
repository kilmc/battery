/*eslint-env node*/

module.exports = {
  mode: 'development',
  output: {
    path: __dirname+'/dist',
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};
