const path = require('path');
const webpack = require('webpack');
const envFile = require('node-env-file');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV =  process.env.NODE_ENV  || 'development';
try {
  envFile(path.join(__dirname, 'config/'+process.env.NODE_ENV+'.env'))
} catch (e) {
  console.log('failed to load env file')
}

module.exports = {
  entry: [
    './src/webpack-public-path',
    // 'react-hot-loader/patch',
    // 'babel-runtime/regenerator',
    'babel-core/register',
    './src/main',
  ],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV : JSON.stringify(process.env.NODE_ENV),
        API_KEY : JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN : JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        STORAGE_BUCKET : JSON.stringify(process.env.STORAGE_BUCKET),
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "main.css",
      chunkFilename: "[id].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HTMLWebpackPlugin({
      template: 'src/index.ejs',
      inject: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          // { loader : 'react-hot-loader/webpack'},
          { loader: 'babel-loader' } // tells webpack to load js files with new (es6) features configured in .babelrc
        ]
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                // sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')
                ],
                // sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'src')],
                // sourceMap: true
              }
            }
          ]
      },
      {
        test: /\.(svg|jpeg|jpg|gif|png|ico)/,
        use: [
          { loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]'
            }
          }
        ]
      },
    ]
  },
  devtool : process.env.NODE_ENV  === 'production' ? false : "cheap-module-eval-source-map"
};
