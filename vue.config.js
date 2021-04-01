// module.exports = { 
//     // outputDir: 'dist',   //build打包后的文件名
//     // // assetsDir: 'assets', //静态资源目录（js, css, img）
//     // lintOnSave: false, //是否开启eslint
//     // publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
//     // devServer: {
//     //     open: true, //是否自动弹出浏览器页面
//     //     // host: "localhost", 
//     //     host: '0.0.0.0',
//     //     port: '8080', 
//     //     https: false,   //是否使用https协议
//     //     hotOnly: false, //是否开启热更新 
//     //     // lintOnSave: false,       //关闭eslint
//     //     proxy: {
//     //         '/api': {
//     //             target: 'http://192.168.2.89:8012', //API服务器的地址
//     //             ws: true,  //代理websockets
//     //             changeOrigin: true, // 虚拟的站点需要更管origin
//     //             pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
//     //                 '^/api': ''  
//     //             }
//     //         }
//     //     },
//     // }
//     outputDir: "safety", //包名
//     // publicPath: process.env.NODE_ENV === 'production'? '/': '/',
//     publicPath: process.env.NODE_ENV === 'production'? '/safety/': '/',
//     lintOnSave: false, //eslint
//     /// 生产环境不生成sourcemap
//     productionSourceMap: false,
//     devServer: {
//       open: true,
//       host: '0.0.0.0',
//       port: 8080,
//     },
// }