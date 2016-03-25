const path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('auto-prefixer');

module.exports = {
  devtool: 'eval',
  devserver: {
    port: '3000',
    browser: 'default'
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'react-hot!babel?presets[]=es2015&presets[]=stage-0&presets[]=react',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss-loader!sass?sourceMap',
        exclude: /node_modules/},
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loaders: [ 'url?limit=10000']
      }
    ],
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
  }
};
