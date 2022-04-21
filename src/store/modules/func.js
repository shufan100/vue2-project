import axios from 'axios'
import { getToken } from '@/utils/jsCookie'
export default {
  state: {
    info: getToken('lang') || 'zh_cn',
    name1: 'func模块的name1'
  },
  mutations: {
    infoMutation (state, newData) {
      state.info = newData
    },
    CS2 (state, newData) {
      console.log(11111)
    },
    MCS2 (state, newData) {
      console.log(11111)
      state.name1 = newData
    }
  },
  actions: {
    infoAction (context, data) {
      context.commit('infoMutation', data)
    },
    cs2 (context, data) {
      console.log(11111)
    },
    axionsCs2 (context) {
      axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(res => {
        context.commit('MCS2', res.data)
      }, err => {
        context.commit('MCS2', err)
      })
    }
  },
  // 初始化 和 修改依赖的值变化 执行的
  getters: {
    gName1 (state) {
      return state.name1 + 'aaa'
    }
  }
}
