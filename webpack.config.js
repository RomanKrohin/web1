const path = require('path');

module.exports = {
  entry: './js/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.php$/,
        use: ['html-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  }
};
