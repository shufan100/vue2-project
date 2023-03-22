/*
 * @Author: shufan100 1549248097@qq.com
 * @Date: 2022-10-23 14:45:51
 * @LastEditors: shufan100 1549248097@qq.com
 * @LastEditTime: 2022-11-09 10:58:24
 * @FilePath: \vue2-project\src\store\state.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// state -- 用于存储数据
import { getToken } from '@/utils/common/jsCookie'
export default {
  sidebarOpened: false, // 侧边栏默认和logo展开
  // sidebarWidth: 180, //侧边栏宽度
  isEnglish: getToken('lang') || 'zh_cn',
  sum: 100,
  counts: 2,
  codes: 3
}

// mutations同步提交 this.$store.commit('sidebarOpenedMutations','参数')
// actions异步提交 this.$store.dispatch('isEnglishAction','参数')
