// const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    watch: true,

    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        historyApiFallback: true,
        // https: true,
        //lazy: true,
        open: true
    },

    devtool: 'inline-source-map',

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
        minimize: false,
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use:['babel-loader']
          },
          {
            test: /\.(scss|sass|css)$/, 
            use:[
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options:{
                  sourceMap:true
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
      title: 'Beforevoyage',
        template:__dirname+'/public/index.html',
        inject:'body',
        filename:'index.html'
    }),
],
    mode: 'development'
};