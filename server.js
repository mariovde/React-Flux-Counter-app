const webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config'),
    open = require("open"),
    port = config.devserver.port,
    browser = config.devserver.browser;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    console.error(err);
  }

  var url = `http://localhost:${port}`;
  console.info(`Listening at ${url}`);

  if (!browser || browser === 'default') {
    open(url);
  } else {
    open(url, browser);
  }

});
