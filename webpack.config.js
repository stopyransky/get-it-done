var path = require('path');
var webpack = require('webpack');

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
      
      mainStyles : path.resolve('./app/styles/main.scss')
    },
    // not need to put extensions in require
    extensions: [ '.js', '.jsx']
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
  devtool : "cheap-module-eval-source-map"
};