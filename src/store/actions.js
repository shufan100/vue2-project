const actions = {
    sidebarOpenedAction:(context, newData) =>{
        context.commit('sidebarOpenedMutations',newData)
    },
    // sidebarWidthAction:(context, newData) =>{
    //     context.commit('sidebarWidthMutations',newData)
    // },
};
export default actions;