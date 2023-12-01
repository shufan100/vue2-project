# 性能

### 一、编译速度优化：

1. 构建使用缓存
   1、hard-source-webpack-plugin
2. 开启多线程打包
   1、 happypack
3. 代码拆分 splitChunks

### 二、打包体积优化：

1. 按需引入
   1、element-ui 按需引入
   2、Echarts 按需引入
   3、lodash 按需引入
2. 压缩和混淆代码
   1、webpack-obfuscator2.6  
   2、javascript-obfuscator
3. 压缩 js、css、html、json 文件体积
   1、 compression-webpack-plugin
4. 压缩图片

### 三、编译速度优化 + 打包体积优化：

1. 合理使用 source-map
   1、productionSourceMap:false - 加速生产构建速度（开发环境无效）
2. externals 提前公共依赖，cdn 引入
   1、提取 vue、vue-router、axios、echarts 公共依赖包
3. 项目使用 momentjs 剔除无用的语言包
   1、moment-locales-webpack-plugin
4. Dllplugin 提取公共依赖
   1、 import { DllPlugin } from 'webpack'
