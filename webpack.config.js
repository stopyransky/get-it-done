var path = require('path');
var webpack = require('webpack');
var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// process.traceDeprecation = true;

try {
    envFile(path.join(__dirname, 'config/'+process.env.NODE_ENV+'.env'))
} catch (e) {

}

module.exports = {
  entry: [
    // libraries
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/foundation.min.js',
    // own start point
    './src/main.jsx',
  ],
  externals : {
    jquery : 'jQuery'
  },
  plugins : [
    new webpack.ProvidePlugin({
      "$" : 'jquery',
      "jQuery" : 'jquery'
    })
    ,
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,

        },
        sourceMap: true
    })
    ,
    new webpack.DefinePlugin({
        'process.env' : {
            NODE_ENV : JSON.stringify(process.env.NODE_ENV),
            API_KEY : JSON.stringify(process.env.API_KEY),
            AUTH_DOMAIN : JSON.stringify(process.env.AUTH_DOMAIN),
            DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
            STORAGE_BUCKET : JSON.stringify(process.env.STORAGE_BUCKET),
        }

    })
    ,
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
      modules : [
        //root: path.resolve(__dirname),
        'node_modules',
        'src/api',
        'src/components',
        'src/redux',
        'playground/components'

      ],

    alias : {
      // OpenWeatherApi  : path.resolve('./src/api/OpenWeatherApi.jsx'),
      // TodoAPI : path.resolve('./src/api//TodoAPI.jsx'),
      // actions : path.resolve('./app/rx-actions/actions.jsx'),
      // reducers : path.resolve('./app/rx-reducers/reducers.jsx'),
      // store : path.resolve("./app/rx-store/configureStore.jsx"),
      mainStyles : path.resolve('./src/styles/main.scss')
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
  devtool : process.env.NODE_ENV  === 'production' ? false : "cheap-module-eval-source-map"
};
