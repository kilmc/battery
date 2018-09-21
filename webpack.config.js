/*eslint-env node*/

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'config',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
