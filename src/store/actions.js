// actions -- 用于响应组件中动作
export default {
  sidebarOpenedAction: (context, newData) => {
    context.commit('sidebarOpenedMutations', newData)
  },
  isEnglishAction: (context, newData) => {
    context.commit('isEnglishMutations', newData)
  },

  jiasum (context, value) {
    context.dispatch('jiasum2', value)
  },
  jiasum1 (context) {
    context.dispatch('jiasum2', 1)
  },
  jiasum2 (context, value) {
    console.log('context:>>>>', context, value)
    if (context.state.isEnglish === 'en') {
      context.commit('JIASUM', value)
    }
  }
}
