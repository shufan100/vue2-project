
module.exports = {
  // 当前应用是被部署在一个域名的根路径上就用'/',如果是部署在子路径上 '/my-app'（根据后端来）
  publicPath: process.env.NODE_ENV === 'production' ? '/static' : '/',
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
      '/api': { // 请求前缀（发起的请求地址有 /api就会走代理）
        target: 'http://localhost:5000', // 5000端口服务器
        ws: true, // 用于支持websockets
        changeOrigin: true, // (默认true)告诉服务器请求来自哪里：false就暴露自己实际的请求地址（localhost:8080），true就说自己的和请求的服务器一样的地址（localhost:5000）
        pathRewrite: { // 重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    }
  }

}
