/*
 * @Author: shufan100 1549248097@qq.com
 * @Date: 2023-07-14 15:30:52
 * @LastEditors: shufan100 1549248097@qq.com
 * @LastEditTime: 2023-07-14 15:33:42
 * @FilePath: \vue2-project\buid\myPlugin.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 自定义 plugin

class MyPlugin {
  apply(compiler) {
    compiler.hooks.compile.tap('MyPlugin', compilation => {
      console.log('====================================')
      console.log('自定义webpack plugin 生效了')
      console.log('====================================')
    })
  }
}

module.exports = MyPlugin
