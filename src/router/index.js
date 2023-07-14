import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/Home.vue'
import RouterModule from './module'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
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
    redirect: 'home', // 默认显示第一个子路由、
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home'),
        meta: { title: '首页', path: 'home' }
      },
      ...RouterModule,
      // 指定了相同的webpackChunkName，将403和404组件合并打包成一个js文件
      // 错误页面
      {
        path: '/403',
        name: '403',
        component: () => import(/* webpackChunkName: 'chunk-error' */ '@/views/errorPage/403'),
        meta: { parentTitle: '错误页面', title: '403', path: 'errorPage/403' }
      },
      {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: 'chunk-error' */ '@/views/errorPage/404'),
        meta: { parentTitle: '错误页面', title: '404', path: 'errorPage/404' }
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/layout/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '*', // 通配,没有匹配到的路由就跳404
    redirect: '/404',
    component: () => import('@/views/errorPage/404'),
    meta: { parentTitle: '错误页面', title: '404', path: 'errorPage/404' }
  }
]

// 创建一个路由器
const router = new VueRouter({
  // history: /  >> /后面的全部都会发送给服务器  ：兼容略差
  // hash:   /#/ >> (#)后面的路径不会发给服务器 ：兼容性好

  mode: 'history', // 默认hash
  bese: process.env.VUE_APP_BASE, // 部署在SHUF的子路径上就要改成对应的base
  routes
  // scrollBehavior(to, from, savedPosition) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({ x: 0, y: 100 })
  //     }, 100)
  //   })
  // }
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
