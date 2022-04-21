// state -- 用于存储数据
import { getToken } from '@/utils/jsCookie'
const state = {
  sidebarOpened: false, // 侧边栏默认和logo展开
  // sidebarWidth: 180, //侧边栏宽度
  isEnglish: getToken('lang') || 'zh_cn',
  sum: 1,
  counts: 2,
  codes: 3
}
export default state

// mutations同步提交 this.$store.commit('sidebarOpenedMutations','参数')
// actions异步提交 this.$store.dispatch('isEnglishAction','参数')
