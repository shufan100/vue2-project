// mutations -- 用于操作数据（mutations方法一般大写）
export default {

  sidebarOpenedMutations: (state, newData) => {
    state.sidebarOpened = newData
  },

  // sidebarWidthMutations: (state, newData) => {
  //   state.sidebarWidth = newData;
  // },
  isEnglishMutations: (state, newData) => {
    state.isEnglish = newData
  },
  JIASUM (state, value) {
    state.sum += value
  },
  JIASUM2 (state, value) {
    state.sum += 2
  }

}
