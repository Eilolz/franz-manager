const webpack = require('webpack');
const path = require('path');
const CustomThemesGenerationPlugin = require('./plugins/customThemesGenerationPlugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: {
      index: 'src/index.html',
      host: '0.0.0.0',
      rewrites: [
	{from: /(?:^|\/)app\.js$/, to: '/app.js'},
	{from: /(?:^|\/)favicon\.png$/, to: '/src/assets/images/favicon.png'}
      ]
    }
  },
  optimization: {
    minimize: false
  },
  performance: {
    maxEntrypointSize: 2097152,
    maxAssetSize: 4194304
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'SERVER_URL': JSON.stringify(process.env.SERVER_URL || ''),
      'WEBSOCKET_SERVER_URL': JSON.stringify(process.env.WEBSOCKET_SERVER_URL || '')
    }),
    new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
    new CustomThemesGenerationPlugin(path.resolve(__dirname, 'src/assets/themes'))
  ],
  entry: {
    'app': [
      './src/index'
    ]
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss|\.css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|ttf|woff|woff2)([\?]?.*)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)([\?]?.*)$/i,
        loader: 'url-loader?limit=25000'
      }
    ]
  }
};
