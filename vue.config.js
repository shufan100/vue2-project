/*
 * @Author: shufan100 1549248097@qq.com
 * @Date: 2022-10-23 14:45:51
 * @LastEditors: shufan100 1549248097@qq.com
 * @LastEditTime: 2023-02-09 14:40:18
 * @FilePath: \vue2-project\vue.config.js
 * @Description: 配置
 *
 * 项目配置：
 *
 *   《防止代码源码泄露》
 *      1.productionSourceMap: false,
 *      2.configureWebpack：devtool: false
 *   《webpackbar 编译进度》
 *      1. webpackbar
 *
 * 性能优化：
 *
 *  *包分析*（webpack-bundle-analyzer@3）
 *      1.配置package.json："analyzer": "set analyzer=true && vue-cli-service build"
 *      2.可查看入口js大小。
 *
 *  *开启gzip* （compression-webpack-plugin@6）
 *      1.优点：压缩chunk-vendors.js文件大小。体积越小，首屏加载就会越快
 *      2.缺点：包体积会变大，但不影响性能。编译时间会长
 *
 *  *externals提取公共依赖包*
 *      1.在html通过csdn方式引入依赖
 *      2.优点：在html通过csdn方式引入依赖。通过csdn来加载这些资源，减少服务请求资源，提升白屏加载速度。
 *      3.优点：包体积压缩50%、打包速度提升26%
 *
 *  *elementUI2.0按需加载*
 *      1.npm install babel-plugin-component -D
 *      2.element-ui文件夹按需引入；然后在main.js引用
 *      3.babel.config.js的plugins: [ 'component', {  libraryName: 'element-ui',  styleLibraryName: 'theme-chalk' }]
 *      4.优点：引入指定组件和样式，来实现减少组件库体积大小；
 *      5优点：包体积压缩72%、打包速度提升40%
 *
 *  *optimization优化分包*
 *
 *  *uglifyjs-webpack-plugin压缩和混淆代码，不支持es6压缩*
 *    1.uglifyjs-webpack-plugin
 *    2.缺点：内部还是没有混淆
 *
 *  *webpack-obfuscator 压缩和混淆代码，支持es6压缩(推荐)*
 *    1.webpack-obfuscator2.6  javascript-obfuscator
 *    2.优点：编译后的代码都会混淆；加载速度提升
 *    2.缺点：编译时间变长；包体积大一倍；包分析看不到源码
 */
const CompressionPlugin = require('compression-webpack-plugin') // gzip
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩和混淆代码，不支持es6压缩)
const WebpackObfuscator = require('webpack-obfuscator') // 压缩和混淆代码，支持es6压缩
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin') // 多进程压缩js

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin') //  webpack编译磁盘缓存
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin') // plugin、loader的编译耗时
const WebpackBar = require('webpackbar')

module.exports = () => {
  const env = process.env
  console.log('环境变量------', env.NODE_ENV)
  return {
    // 当前应用是被部署在一个域名的根路径上就用'/',如果是部署在子路径上 '/my-app'（根据后端来）
    // process.env.NODE_ENV
    publicPath: env.VUE_APP_BASE, // 系统部署在子路径上
    outputDir: 'dist', // build打包后的文件名(生产环境构建文件的目录)(编译前会自动先将之前的dist包删除)
    assetsDir: 'assets', // 放置生成的静态资源 (js、css、img、fonts)
    lintOnSave: false, // 是否开启eslint (否在开发环境下通过 eslint-loader 在每次保存时 lint 代码) （值为boolean | 'warning' | 'default' | 'error'）
    productionSourceMap: false, // (编译后生成的map.js，提示打印文件位置) 默认true
    // 开启代理服务器
    devServer: {
      open: true, // 是否自动弹出浏览器页面
      // host: "localhost",
      host: '0.0.0.0',
      port: '8080',
      https: false, // 是否使用https协议
      hotOnly: false, // 是否开启热更新
      proxy: {
        '/api': {
          // 请求前缀（匹配所有以 '/api'开头的请求路径）
          target: 'http://localhost:5000', // 5000端口服务器（代理目标的基础路径）
          ws: true, // 用于支持websockets
          changeOrigin: true, // (默认true)告诉服务器请求来自哪里：false就暴露自己实际的请求地址（服务器的请求头收到的是localhost:8080），true就说自己的和请求的服务器一样的地址（服务器的请求头收到的是localhost:5000）
          pathRewrite: {
            // 重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
            '^/api': ''
          }
        },
        '/jpi': {
          target: 'http://localhost:5001',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '^/jpi': ''
          }
        }
      }
    },
    configureWebpack: config => {
      return {
        devtool: process.env === 'production' ? 'source-map' : 'cheap-module-source-map', // 开发：cheap-module-source-map   生产：source-map 防止源代码泄漏
        // 提取公共依赖包、通过csdn方式引入依赖，通过csdn来加载这些资源，减少服务请求资源，提升白屏加载速度
        externals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          axios: 'axios',
          echarts: 'echarts'
        },
        // 消除打包文件太大警告
        performance: {
          hints: 'warning',
          // 入口起点的最大体积
          maxEntrypointSize: 5000000,
          // 生成文件的最大体积
          maxAssetSize: 3000000
          // 只给出 js 文件的性能提示
          // assetFilter: function (assetFilename) {
          //   return assetFilename.endsWith('.js')
          // }
        },
        plugins: [
          // 压缩和混淆代码，不支持es6压缩
          // new UglifyJsPlugin({
          //   uglifyOptions: {
          //     warnings: false,
          //     compress: {
          //       drop_console: true, //是否删除代码中所有的console，默认为false
          //       drop_debugger: false, //是否删除代码中所有的debugger，默认为false
          //       pure_funcs: ['console.log']
          //     }
          //   }
          // }),

          // 压缩和混淆代码，支持es6压缩(非常耗时)(包分析时要注释)
          !process.env.analyzer &&
            new WebpackObfuscator(
              {
                // 压缩代码
                compact: true,
                // 是否启用控制流扁平化(降低1.5倍的运行速度)
                // controlFlowFlattening: false,
                // // 随机的死代码块(增加了混淆代码的大小)
                // deadCodeInjection: false,
                // // 此选项几乎不可能使用开发者工具的控制台选项卡
                debugProtection: false,
                // 标识符的混淆方式 hexadecimal(十六进制) mangled(短标识符)
                // identifierNamesGenerator: 'hexadecimal',
                // log: false,
                // 是否启用全局变量和函数名称的混淆
                // renameGlobals: false,
                // 通过固定和随机（在代码混淆时生成）的位置移动数组。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
                rotateStringArray: true,
                // // 混淆后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
                selfDefending: true,
                // 删除字符串文字并将它们放在一个特殊的数组中
                // stringArray: true,
                // stringArrayEncoding: 'base64',
                // stringArrayThreshold: 0.75,
                // 允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
                unicodeEscapeSequence: false
              },
              []
            ),
          // 并行压缩输出JS代码
          // new ParallelUglifyPlugin({
          //   uglifyJS: {
          //     output: {
          //       beautify: false,
          //       comments: false
          //     },
          //     compress: {
          //       // warnings: false,
          //       drop_console: true,
          //       collapse_vars: true,
          //       reduce_vars: true
          //     }
          //   }
          // }),
          // gzip压缩
          new CompressionPlugin({
            test: /\.(js|css|html|json)(\?.*)?$/i, // 需要压缩的文件正则
            threshold: 10240, // 对超过10k的文件进行gzip压缩
            deleteOriginalAssets: false // 不删除源文件
          }),

          // webpack编译磁盘缓存
          new HardSourceWebpackPlugin(),
          // plugin、loader的编译耗时
          new SpeedMeasureWebpackPlugin(),
          // 打包进度
          new WebpackBar()
        ]
      }
    },

    chainWebpack: config => {
      // 当环境变量中analyzer 为true 时 运行该配置
      if (process.env.analyzer) {
        // 包分析
        config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      }

      //   return {
      //     optimization: {
      //       splitChunks: {
      //         chunks: 'all',
      //         minSize: 1024 * 2, // 分割js文件的大小20kb、默认30kb
      //         minChunks: 1, // 提取的chunk最少被引用1次，满足条件才会代码分割
      //         maxAsyncRequests: 6, // 按需加载时的最大并行请求数。默认30
      //         maxInitialRequests: 4 // 入口js文件最大并行请求数量。默认30
      //         // { automaticNameDelimiter?, automaticNameMaxLength?, cacheGroups?, chunks?, enforceSizeThreshold?, fallbackCacheGroup?, filename?, hidePathInfo?, maxAsyncRequests?, maxInitialRequests?, maxSize?, minChunks?, minSize?, name? }
      //         // cacheGroups: {
      //         //   vue: {
      //         //     name: 'vue',
      //         //     chunks: 'all',
      //         //     test: /[\\/]node_modules[\\/]vue[\\/]/,
      //         //     priority: -10
      //         //   },
      //         //   vendor: {
      //         //     name: 'vendor',
      //         //     chunks: 'all',
      //         //     priority: -10, //  打包优先级权重值，值越大，优先级越高
      //         //     test: /node_modules\/(.*)\.js/
      //         //   },
      //         //   default: {
      //         //     priority: -20, // 打包优先级权重值，值越大，优先级越高
      //         //     reuseExistingChunk: true // 遇到重复包直接引用，不重新打包
      //         //   }
      //         // elementUI: {
      //         //   // 将elementUI拆分为单个包
      //         //   name: 'chunk-elementUI',
      //         //   // 重量需要大于libs和app，否则将打包到libs或app中
      //         //   priority: 20,
      //         //   // 为了适应cnpm
      //         //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/
      //         // }
      //         // }
      //       }
      //     }
      //   }
    }
  }
}
