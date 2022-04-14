import Vue from 'vue'
import Vuex from 'vuex'

// import state from './state'
import mutations from './mutations'
import actions from './actions'
import func from './modules/func'
Vue.use(Vuex)

export default new Vuex.Store({
  // state,
  mutations,
  actions,
  modules: {
    func
  }
})
