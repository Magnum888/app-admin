const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports={

    devtool: 'source-map',

    entry:{
        index:'./src/index.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename:'[id][hash].js',
        publicPath:'/'
    },
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
                output: {
                    comments: false,
                },
            }
          }),
          new OptimizeCSSAssetsPlugin({})
        ],
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: ['babel-loader']
          },
          {
            test: /\.(scss|sass|css)$/, 
            use:[
              {
                loader: 'style-loader'
              },
              { 
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader',
                options: { sourceMap: true }
              },
              {
                loader: 'postcss-loader',
                options: {
                    // parser: 'sugarss',
                    ident: 'postcss',
                    plugins: (loader) => [
                      require('postcss-import')({ root: loader.resourcePath }),
                      require('postcss-preset-env')(),
                      require('cssnano')()
                    ]
                }
              }
            ]
          },
          {
            test: /\.(html)$/,
            use: {
              loader: 'html-loader',
              options: {
                attrs: [':data-src'],
                minimize:true
              }
            }
          }
        ]
      },
    plugins: [new HtmlWebpackPlugin({
      title: 'App-admin',
        template:__dirname+'/public/index.html',
        inject:'body',
        filename:'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[id][hash].css'
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
          },
    })
],
    mode: 'production'
};