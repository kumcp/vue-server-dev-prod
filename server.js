const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./config/index')
const path = require("path");

const app = express();
const webpackConfig = require('./build/webpack.server.conf.js');
const compiler = webpack(webpackConfig);

// configuration file as a base.

app.get("/", function(req, res){
    res.json("ok")
})

app.use( webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}));

app.use("/test*", function (req, res, next) {
    var filename = path.join(compiler.outputPath,'index.html');
    compiler.outputFileSystem.readFile(filename, function(err, result){
      if (err) {
        return next(err);
      }
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
  });

// Serve the files on port 3000.
const PORT = config.dev.port
app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!\n');
});