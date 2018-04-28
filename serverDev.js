
module.exports = function runDev(app) {
  const browserSync = require('browser-sync')
  // const browserSyncReuseTab = require('browser-sync-reuse-tab')(browserSync)
  const historyApiFallback = require('connect-history-api-fallback')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpack = require('webpack')
  const config = require('./webpack.config.js')
  const compiler = webpack(config)
  const express = require('express')
  
  // adding dev middleware so our server can refresh bundle 
  // every time a change occurs
  browserSync({
    port: 3000,
    ui: {
      port: 3001
    },
    open: false,
    server: {
      baseDir: 'src',
      middleware: [
        historyApiFallback(),
        webpackDevMiddleware(compiler, {
          // Dev middleware can't access config, so we provide publicPath
          publicPath: config.output.publicPath,
  
          // These settings suppress noisy webpack output so only errors are displayed to the console.
          noInfo: false,
          quiet: true,
          logLevel: "error",
          stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
          },
  
          // for other settings see
          // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
        }),
  
        // bundler should be the same as above
        webpackHotMiddleware(compiler) 
      ]
    },
  
    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'src/**',
      'src/*.ejs'
    ]
  })

  const staticMiddleware = express.static('public')
  app.use(staticMiddleware)
}