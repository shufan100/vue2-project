import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import  state from "./state";
import  mutations from "./mutations";
import  actions from "./actions";

export default new Vuex.Store({
  state,
  mutations,
  actions
  // state: {
  //   borderImg:{ //图边框
  //     backgroundImage:'url(' + require('@/assets/images/u37.png') + ')',
  //     backgroundRepeat:'no-repeat',
  //     backgroundSize:'100% 100%'
  //   },
  //   defaultActive:'facilities', //当前激活菜单的 index
  //   collapse:false,//菜单是否折叠
  //   breadcrumbArr:['台账管理','电缆线路台账管理','设施台账编辑'],//面包屑初始值

  // },
  // getters:{
  //   borderImg: state => state.borderImg,
  //   defaultActive: state => state.defaultActive,
  //   collapse: state => state.collapse,
  //   breadcrumbArr: state => state.breadcrumbArr,
  // },
  // mutations: {
  //   muBreadcrumbArr:(state, NewBreadcrumbArr) =>{
  //     state.breadcrumbArr = NewBreadcrumbArr;
  //   },
  //   muDefaultActive:(state, NewDefaultActive) =>{
  //     state.defaultActive = NewDefaultActive;
  //   },
  //   muCollapse:(state, NewCollapse) =>{
  //     state.collapse = NewCollapse;
  //   },
  // },
  // actions: {
  //   acBreadcrumbArr:(context, NewBreadcrumbArr) =>{
  //     context.commit('muBreadcrumbArr',NewBreadcrumbArr)
  //   },
  //   acDefaultActive:(context, NewDefaultActive) =>{
  //     context.commit('muDefaultActive',NewDefaultActive)
  //   },
  //   acCollapse:(context, NewCollapse) =>{
  //     context.commit('muCollapse',NewCollapse)
  //   },
  // },
})
