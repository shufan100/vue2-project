import { getToken } from '@/utils/jsCookie'
const state = {
  sidebarOpened: false, // 侧边栏默认和logo展开
  // sidebarWidth: 180, //侧边栏宽度
  isEnglish: getToken('lang') || 'zh_cn'
}
export default state

// mutations同步提交 this.$store.commit('changetest','参数')
// actions异步提交 this.$store.dispatch('changetest','参数')
