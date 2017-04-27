var path = require('path');
var webpack = require('webpack');

process.traceDeprecation = true;

module.exports = {
  entry: [
    // libraries
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/foundation.min.js',
    // own start point
    './app/main.jsx',
  ],
  externals : {
    jquery : 'jQuery'
  },
  plugins : [
    new webpack.ProvidePlugin({
      "$" : 'jquery',
      "jQuery" : 'jquery'
    }),
    new webpack.LoaderOptionsPlugin({
         // test: /\.xxx$/, // may apply this only for some modules
         options: {
           sassLoader: {
            includePaths: [
              path.resolve(__dirname, './node_modules/foundation-sites/scss'),
            ]
          },
        }
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    // using internal components as external require('name')
    //root: path.resolve(__dirname),
    alias : {
      App : path.resolve( './app/components/App.jsx' ),
      AppNav : path.resolve('./app/components/AppNav.jsx'),
      AppAbout : path.resolve('./app/components/AppAbout.jsx'),
      AppHome : path.resolve('./app/components/AppHome.jsx'),
      Greeter : path.resolve( './app/components/Greeter.jsx' ),
      GreetForm : path.resolve( './app/components/GreetForm.jsx'),
      GreetMessage : path.resolve( './app/components/GreetMessage.jsx'),
      Weather : path.resolve( './app/components/Weather.jsx'),
      WeatherForm : path.resolve('./app/components/WeatherForm.jsx'),
      WeatherMessage : path.resolve('./app/components/WeatherMessage.jsx'),
      OpenWeatherApi  : path.resolve('./app/api/OpenWeatherApi.jsx'),
      Examples : path.resolve( './app/components/Examples.jsx'),
      ErrorModal : path.resolve('./app/components/ErrorModal.jsx'),
      Timer : path.resolve('./app/components/Timer.jsx'),
      Countdown : path.resolve('./app/components/Countdown.jsx'),
      CountdownForm : path.resolve('./app/components/CountdownForm.jsx'),
      CountdownControls : path.resolve('./app/components/CountdownControls.jsx'),
      Clock : path.resolve('./app/components/Clock.jsx'),
      mainStyles : path.resolve('./app/styles/main.scss')
    },
    // not need to put extensions in require
    extensions: [ '.js', '.jsx' ]
  },

  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  // sassLoader : {
  //   includePaths: [
  //     path.resolve(__dirname, './node_modules/foundation-sites/scss'),
  //   ]
  // },
  devtool : "cheap-module-eval-source-map"
};