// 用于将state中的数据进行加工 (state的数据已经修改后再进行逻辑处理，和计算属性类似)
// 得写返回值
const getters = {
  bigSum: (state) => {
    return state.sum * 10
  },
  // 简写
  smallSum (state) {
    console.log(state, '=======')
    return state.sum / 2
  }
}
export default getters
