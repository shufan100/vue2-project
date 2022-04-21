// 用于创建vuex中最为核心的store (创建store之前必须先注册vuex:Vue.use(Vuex))
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

// 模块
import func from './modules/func'
import user from './modules/user'
Vue.use(Vuex)

// 导出Store
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    func,
    user
  }
})
