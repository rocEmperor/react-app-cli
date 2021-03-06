const webpack = require('webpack');
const config = require('./webpack.config.dev');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const NODE_ENV = process.env.NODE_ENV;

config.devtool = 'eval';
config.mode = 'production';

config.plugins.push(
  new MiniCssExtractPlugin({
    filename: NODE_ENV == 'development' ? "css/[name].css" : "css/[name]-[hash:8].css"
  })
)
config.plugins.push(new OptimizeCSSAssetsPlugin({}));

// 许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了
// 使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针
// 对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
)

module.exports = config;