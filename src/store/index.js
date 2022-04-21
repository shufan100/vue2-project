// 用于创建vuex中最为核心的store (创建store之前必须先注册vuex:Vue.use(Vuex))
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import func from './modules/func'
Vue.use(Vuex)

// 导出Store
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    func
  }
})
