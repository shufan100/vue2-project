// actions -- 用于响应组件中动作
const actions = {
  sidebarOpenedAction: (context, newData) => {
    context.commit('sidebarOpenedMutations', newData)
  },
  // sidebarWidthAction:(context, newData) =>{
  //     context.commit('sidebarWidthMutations',newData)
  // },
  isEnglishAction: (context, newData) => {
    context.commit('isEnglishMutations', newData)
  }
}
export default actions
