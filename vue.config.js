/*
 * @Author: shufan100 1549248097@qq.com
 * @Date: 2022-10-23 14:45:51
 * @LastEditors: shufan100 1549248097@qq.com
 * @LastEditTime: 2023-02-09 14:40:18
 * @FilePath: \vue2-project\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = () => {
  const env = process.env
  // console.log('环境变量------', env)
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
    chainWebpack: config => {
      // if (env.NODE_ENV === 'production') {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end()
      // }
      return {
        splitChunks: {
          chunks: 'all',
          minSize: 1024 * 5, // 分割js文件的大小20kb、默认30kb
          minChunks: 2, // 提取的chunk最少被引用1次，满足条件才会代码分割
          maxAsyncRequests: 6, // 按需加载时的最大并行请求数。默认30
          maxInitialRequests: 4 // 入口js文件最大并行请求数量。默认30
          // { automaticNameDelimiter?, automaticNameMaxLength?, cacheGroups?, chunks?, enforceSizeThreshold?, fallbackCacheGroup?, filename?, hidePathInfo?, maxAsyncRequests?, maxInitialRequests?, maxSize?, minChunks?, minSize?, name? }
          // cacheGroups: {
          //   vue: {
          //     name: 'vue',
          //     chunks: 'all',
          //     test: /[\\/]node_modules[\\/]vue[\\/]/,
          //     priority: -10
          //   },
          //   vendor: {
          //     name: 'vendor',
          //     chunks: 'all',
          //     priority: -10, //  打包优先级权重值，值越大，优先级越高
          //     test: /node_modules\/(.*)\.js/
          //   },
          //   default: {
          //     priority: -20, // 打包优先级权重值，值越大，优先级越高
          //     reuseExistingChunk: true // 遇到重复包直接引用，不重新打包
          //   }

          // elementUI: {
          //   // 将elementUI拆分为单个包
          //   name: 'chunk-elementUI',
          //   // 重量需要大于libs和app，否则将打包到libs或app中
          //   priority: 20,
          //   // 为了适应cnpm
          //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/
          // }
          // }
        }
      }
    }
  }
}
