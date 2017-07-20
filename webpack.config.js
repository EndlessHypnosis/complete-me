
module.exports = {
  entry: {
    main: "./index.js"
    // test: "mocha!./tests/Trie-test.js"
  },
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(png|jpeg|jpg|ttf|gif)$/, loader: 'url-loader' },
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.css']
  }
};
