const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// html-webpack-harddisk-plugin是在webpack-dev-server命令下配合html-webpack-plugin使用的插件，正常情况下devServer配置的工作空间下必须要有一个html
// 文件, 但是html文件引用的js文件必须由我们手动写死，使用html-webpack-harddisk-plugin插件，可以在文件执行npm run dev的时候自动生成一个html的物理文件
// 而且依赖的js文件也自动生成，这样节省了我们手动维护html文件的成本，且不容易出错
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const rootPath = path.join(__dirname, '../src');
const entryPath = path.join(rootPath, './index.js');
const buildPath = path.resolve(__dirname, '../dist');
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: {
    app: [entryPath]
  },
  output: {
    filename: NODE_ENV == 'development' ? "js/[name].js" : "js/[name]-[hash:8].js",
    path: buildPath,
    publicPath: NODE_ENV === 'development' ? '/assets/' : '',
    chunkFilename: NODE_ENV == 'development' ? 'js/[name].js' : 'js/[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /(node_modules|bower_components)/,
        use: NODE_ENV === 'development' ? [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' }
        ] : [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: NODE_ENV == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../'
            }
          }, {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader' // css3前缀
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: NODE_ENV == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../'
            }
          }, {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader' // css3前缀
          }, {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20000,
              outputPath: 'images',
              name: NODE_ENV == 'development' ? '[name].[ext]' : '[name]-[hash:8].[ext]',
              publicPath: NODE_ENV == 'development' ? '/assets/images' : '../images' 
            }
          }, {
            // 压缩图片(development环境不进行压缩，编译速度稍微快一些)
            loader: 'img-loader',
            options: {
              plugins: NODE_ENV == 'development' ? [] : [
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false
                }),
                require('imagemin-pngquant')({
                  progressive: true,
                  arithmetic: false
                }),
                require('imagemin-svgo')({
                  progressive: true,
                  arithmetic: false
                })
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".less", ".json"],
    alias: {
      vue: 'vue/dist/vue.js',
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: path.join(buildPath, './index.html'),
      publicPath: '/assets/',
      alwaysWriteToDisk: true // HtmlWebpackHarddiskPlugin插件需要的配置项
    }),
    new HtmlWebpackHarddiskPlugin()
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    //提取第三方依赖为公共文件，优化页面访问速度，协商缓存
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        cache: true,
        parallel: true, // 开启并行压缩，充分利用cpu
        extractComments: false, // 移除注释
      })
    ]
  },
  devServer: {
    contentBase: [buildPath],
    // compress: true,
    port: 9000,
    publicPath: '/assets/', // 必须是相对路径
    hot: true
  }
}