const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

module.exports = {
  mode: 'development',

  entry: {
    index: './src/ts/index',
  },
  
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  
  devServer: {
    port: 8080
  },

  devtool: 'cheap-source-map',
  
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },

  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', include: path.resolve(__dirname, 'src') },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, 'src/scss')
        // use: ExtractTextPlugin.extract({
        //   //fallback: 'style-loader',
        //   use: ['css-loader', 'sass-loader']
        // }),
      }
      // {
      //   test: /\.(bmp|gif|jpg|jpeg|png|svg)$/,
      //   include: path.resolve(__dirname, 'src/images'),
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]'
      //       }
      //     }
      //   ]
      // }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/icon.jpeg',
      template: path.resolve(__dirname, 'index.html')
    })

    // dll plugin 暂时不用吧
    // new webpack.DllReferencePlugin({
    //   context: '.',
    //   manifest: require("./dist/bundle.manifest.json"),
    // })
    // new webpack.HotModuleReplacementPlugin()
    // new ExtractTextPlugin('[name].css')
  ]
}