import Vue from 'vue'
import router from '../router'
//  ***** Progress 顶部进度条 ****
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由前 --- (前置）全局路由守卫
router.beforeEach((to, from, next) => {
  // 从 路由a(from) 跳转 路由b(to)
  console.log('@@@ ~ from ~ 跳转前的路由', from)
  console.log('@@@ ~ to ~ 要跳转的路由', to)
  NProgress.start() // 进度条开始Progress

  const role = sessionStorage.getItem('ms_username')
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permissions) {
    // 是否需要权限配置
    // 1.当前登录的账号是admin才有权限访问路由，不是admin账号都跳403路由
    role === 'admin' ? next() : next('/403')
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      })
    } else {
      next()
    }
  }
})

// 路由后 --- (后置）全局路由守卫
router.afterEach((to, from) => {
  document.title = `${to.meta.title} | SHUF` // 修改地址栏title（需要路由跳转成功才去修改）
  // console.log('@@@ ~ from ~ 跳转前的路由', from)
  // console.log('@@@ ~ to ~ 要跳转的路由', to)
  NProgress.done() // 结束Progress
})
