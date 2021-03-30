import router from '../router'
//  ***** Progress 顶部进度条 ****
import NProgress from 'nprogress' 
import('nprogress/nprogress.css')

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    NProgress.start()
    // document.title = `${to.meta.title} | SF`; //设置地址栏title
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permissions) {
        // 1.先判断进入路由是否有控制权限，有进来，不是管理员得话路由直接走403无权限访问
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

router.afterEach(() => {
    NProgress.done() // 结束Progress
})