import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/Home.vue'
import RouterModule from './module'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
// console.log(originalPush,'originalPush')
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 利用path设置中英文
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'home', // 默认显示第一个子路由、
    meta: { title: '首页1' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/components/page/home'),
        meta: { title: '首页', path: 'home' }
      },
      ...RouterModule,

      // 权限管理
      {
        path: '/pagePermissions',
        name: 'pagePermissions',
        component: () => import('@/components/permissions/pagePermissions'),
        meta: {
          parentTitle: '权限管理',
          title: '页面权限',
          path: 'permissions/pagePermissions',
          permissions: true
        }
      },
      {
        path: '/btnPermissions',
        name: 'btnPermissions',
        component: () => import('@/components/permissions/btnPermissions'),
        meta: {
          parentTitle: '权限管理',
          title: '按钮权限',
          path: 'permissions/btnPermissions',
          permissions: true
        }
      },
      // 错误页面
      {
        path: '/403',
        name: '403',
        component: () => import('@/components/page/errorPage/403'),
        meta: { parentTitle: '错误页面', title: '403', path: 'errorPage/403' }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/components/page/errorPage/404'),
        meta: { parentTitle: '错误页面', title: '404', path: 'errorPage/404' }
      },
      // echarts
      {
        path: '/echartsMap',
        name: 'echartsMap',
        component: () => import('@/components/echarts/echartsMap'),
        meta: {
          parentTitle: '地图组件',
          title: '高德地图',
          path: 'EChartsCom/echartsMap',
          permissions: true
        }
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/layout/Login.vue'),
    meta: { title: '登录' }

  },
  {
    path: '/',
    redirect: '/404',
    component: () => import('@/components/page/errorPage/404'),
    meta: { parentTitle: '错误页面', title: '404', path: 'errorPage/404' }
  }

]

// 创建一个路由器
const router = new VueRouter({
  mode: 'history',
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
