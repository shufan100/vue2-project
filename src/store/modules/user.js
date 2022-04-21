export default {
  namespaced: true, // 命名空间 (mutation和action都需要导出去，不能直接使用) (命名空间的优点：2个模块都可以定义userInfo的字段，不冲突)
  state: {
    userName: 'shufan',
    datas: ['1', '2', '8']
  },
  mutations: {
    CS (context, val) {
      console.log('CSCSCSCS')
    }
  },
  actions: {
    cs (context, val) {
      console.log('cs点九九')
    }
  },
  // 初始化 和 修改依赖的值变化 执行的
  getters: {
    gUserName (state) {
      return state.userName + '001'
    }
  }
}
