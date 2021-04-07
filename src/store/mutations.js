

const mutations = {

  sidebarOpenedMutations: (state, newData) => {
    state.sidebarOpened = newData;
  },

  // sidebarWidthMutations: (state, newData) => {
  //   state.sidebarWidth = newData;
  // },
  isEnglishMutations: (state, newData) => {
    state.isEnglish = newData;
  },
}
export default mutations;