import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// ***** element-ui *****
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 路由权限
import './common/routerPermissions.js'
// ***** 自定义指令（拖拽、防抖、节流）****
import './common/directives'

/** ---------------------- 功能---------------------- */
// 引入动画样式
import 'animate.css'
// ***** mock ****
import '@/mock'
/// iconfont
import '@/assets/icon/iconfont.css'

// ***** 打印机 *****
import Print from './utils/common/prints'
// ***** 导出pdf *****
import htmlToPdf from './utils/common/htmlToPdf'
// ***** 中英文 ****
import i18n from '@/lang'

// 轮播图(npm install swiper@3 --save-dev)
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min.js'

// 图片预览
import elImageViewer from 'element-ui/packages/image/src/image-viewer'
// mixin
import indexMixin from './mixin/index'
// 无缝滚动
import scroll from 'vue-seamless-scroll'
// 图片裁剪
// import '@/assets/cropper/cropper.min.css'
// import '@/assets/cropper/ImgCropping.css'
import ImgCutter from 'vue-img-cutter'

// ***挂载vue原型***
import plugins from './utils/plugins'

Vue.component('ImgCutter', ImgCutter)
Vue.component('elImageViewer', elImageViewer)
// 混合模式
Vue.mixin(indexMixin)

Vue.use(ElementUI).use(plugins)
Vue.use(scroll).use(ImgCutter).use(Print).use(htmlToPdf)
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
