import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/Home.vue'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
// console.log(originalPush,'originalPush')
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 利用path设置中英文
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "home", //默认显示第一个子路由、
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/components/page/home'),
        meta: { title: '首页' ,path:'home'}
      },
      // 表单
      {
        path: '/form1',
        name: 'form1',
        component: () => import('@/components/page/form'),
        meta: { title: '表单/Form表单',path:'form/form1',permissions:true}
      },
      {
        path: '/table',
        name: 'table',
        component: () => import('@/components/page/table'),
        meta: { title: '表单/基础表格',path:'form/table',permissions:true}
      },
      {
        path: '/editor',
        name: 'editor',
        component: () => import('@/components/page/vueEditor'),
        meta: { title: '表单/富文本编辑器',path:'form/editor',permissions:true }
      },
      {
        path: '/markdown',
        name: 'markdown',
        component: () => import('@/components/page/markdown'),
        meta: { title: '表单/Markdown编辑器',path:'form/markdown',permissions:true }
      },
      {
        path: '/nativeTable',
        name: 'nativeTable',
        component: () => import('@/components/page/nativeTable'),
        meta: { title: '表单/原生表格',path:'form/nativeTable',permissions:true }
      },
      // 个人信息 
      {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('@/components/page/infoShow'),
        meta: {title: '信息管理/个人信息',path:'info/userInfo',permissions:true }
      },
      {
        path: '/modifyInfo',
        name: 'modifyInfo',
        component: () => import('@/components/page/modifyInfo'),
        meta: {title: '信息管理/修改信息',path:'info/modifyInfo',permissions:true }
      },
      // 消息
      {
        path: '/msgCenter',
        name: 'msgCenter',
        component: () => import('@/components/page/msgCenter'),
        meta: { title: '消息中心',path:'msgCenter',permissions:true }
      },
      {
        path: '/share',
        name: 'share',
        component: () => import('@/components/page/share'),
        meta: { title: '分享功能',path:'share',permissions:true }
      },
      // demo
      {
        path: '/shopping',
        name: 'shopping',
        component: () => import('@/components/demo/shopping'),
        meta: { title: 'Demo/购物车',path:'demo/shopping' ,permissions:true}
      },
      {
        path: '/magnifying',
        name: 'magnifying',
        component: () => import('@/components/demo/magnifying'),
        meta: { title: 'Demo/放大镜',path:'demo/magnifying' ,permissions:true}
      },
      {
        path: '/threeD',
        name: 'threeD',
        component: () => import('@/components/demo/3D'),
        meta: { title: 'Demo/3D旋转图',path:'demo/3D' ,permissions:true}
      },
      {
        path: '/upload',
        name: 'upload',
        component: () => import('@/components/demo/upload'),
        meta: { title: 'Demo/文件上传',path:'demo/upload' ,permissions:true}
      },
      {
        path: '/printer',
        name: 'printer',
        component: () => import('@/components/demo/printer'),
        meta: { title: 'Demo/打印机',path:'demo/printer' ,permissions:true}
      },
      {
        path: '/exportPdf',
        name: 'exportPdf',
        component: () => import('@/components/demo/exportPdf'),
        meta: { title: 'Demo/导出PDF',path:'demo/exportPdf' ,permissions:true}
      },
      // 拖拽组件 dragAndDrop
      {
        path: '/dialog',
        name: 'dialog',
        component: () => import('@/components/page/dragAndDrop/dialog'),
        meta: { title: '拖拽组件/拖拽弹窗',path:'dragAndDrop/dialog',permissions:true }
      },
      {
        path: '/dragList',
        name: 'dragList',
        component: () => import('@/components/page/dragAndDrop/dragList'),
        meta: { title: '拖拽组件/拖拽列表',path:'dragAndDrop/dragList' ,permissions:true}
      },
      // 权限管理
      {
        path: '/pagePermissions',
        name: 'pagePermissions',
        component: () => import('@/components/permissions/pagePermissions'),
        meta: { title: '权限管理/页面权限' ,path:'permissions/pagePermissions',permissions:true}
      },
      {
        path: '/btnPermissions',
        name: 'btnPermissions',
        component: () => import('@/components/permissions/btnPermissions'),
        meta: { title: '权限管理/按钮权限',path:'permissions/btnPermissions' ,permissions:true}
      },
      // 错误页面
      {
        path: '/403',
        name: '403',
        component: () => import('@/components/page/errorPage/403'),
        meta: { title: '错误页面/403',path:'errorPage/403' }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/components/page/errorPage/404'),
        meta: { title: '错误页面/404',path:'errorPage/404' }
      },
      //echarts 
      {
        path: '/echartsMap',
        name: 'echartsMap',
        component: () => import('@/components/echarts/echartsMap'),
        meta: { title: '地图组件/高德地图',path:'EChartsCom/echartsMap' ,permissions:true}
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/layout/Login.vue'),
    meta: { title: '登录' }
  },

]

const router = new VueRouter({
  // mode: 'history',
  routes
})


// router.beforeEach((to, from, next) => {
//   console.log(to,from,next,'999')
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })

export default router
