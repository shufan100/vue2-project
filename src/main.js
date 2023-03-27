import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// ***** element-ui *****
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/element-ui/index.js'

// 路由权限
import '@/router/routerPermissions.js'

/** ---------------------- 功能---------------------- */
// 引入动画样式
import 'animate.css'
// ***** mock ****
import '@/mock'
/// iconfont
import '@/assets/icon/iconfont.css'
// 轮播图(npm install swiper@3 --save-dev)
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min.js'

// ***** 自定义指令（拖拽、防抖、节流）****
import '@/utils/directives'

// ***** 中英文 ****
import i18n from '@/lang'
// mixin
import indexMixin from './mixin/index'
// ***挂载vue原型***
import plugins from './utils/plugins'

// 混合模式
Vue.mixin(indexMixin)
// Vue.use(ElementUI)
Vue.use(plugins)

// 签名
// import VueSignaturePad from 'vue-signature-pad'
// Vue.use(VueSignaturePad)
// import VueSignature from 'vue-signature-pad'
// Vue.use(VueSignature)

// 挂载vue原型
Vue.prototype.$axios = axios
// Vue.prototype.$store = store  // vue 会自定在实例身上加$store

const vm = new Vue({
  data: {
    msgs: 'hello msg'
  },
  router,
  store, // 这边就是引入的store，vue会自动加在实例身上，名为$store
  i18n,
  render: h => h(App), // 模板编译，通过render函数将模板的虚拟dom转成真是dom
  // render: h => {
  //   return h('div', { attrs: { id: 'app', class: 'app' } }, [h('h1', 'Hello Vue2')])
  // },
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线
  }
}).$mount('#app')
console.log('vm:', vm)
