import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ***** axios *****
import axios from 'axios'
import qs from 'qs'
// ***** element-ui *****
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// ***** 打印机 *****
import Print from './utils/prints'
// ***** 导出pdf *****
import htmlToPdf from './utils/htmlToPdf'
// ***** echarts ****
import echarts from 'echarts'
// ***** 拖拽指令****
import './common/directives'
// 路由权限
import './common/routerPermissions.js'
// ***** 中英文 ****
import i18n from '@/lang'
/// 引入iconfont class加iconfont
import '@/assets/icon/iconfont.css'
// 分享功能集合
// import { shareConfig } from './utils/share';
import * as share from './utils/share'
// 全局指令
import './utils/preventReClick'
// 图片预览
import elImageViewer from 'element-ui/packages/image/src/image-viewer'
// 弹窗封装
import * as msg from './utils/message'
// mixin
import indexMixin from './mixin/index'

// 轮播图(npm install swiper@3 --save-dev)
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min'

// 防伪
import watermark from '@/utils/watermark'
// 文字超出省略号
import wordlimit from '@/utils/wordlimit'
// 无缝滚动
import scroll from 'vue-seamless-scroll'

// 图片裁剪
// import '@/assets/cropper/cropper.min.css'
import '@/assets/cropper/cropper.min.js'
// import '@/assets/cropper/ImgCropping.css'
import ImgCutter from 'vue-img-cutter'
Vue.use(scroll)
Vue.use(ImgCutter)
Vue.component('ImgCutter', ImgCutter)

// 签名
// import VueSignaturePad from 'vue-signature-pad'
// Vue.use(VueSignaturePad)
// import VueSignature from 'vue-signature-pad'
// Vue.use(VueSignature)

Vue.use(ElementUI)
Vue.use(Print)
Vue.use(htmlToPdf)

// 注册全局组件
Vue.component('elImageViewer', elImageViewer)
// 混合模式
Vue.mixin(indexMixin)
// 挂载vue原型
Vue.prototype.$success = msg.msgSuccess
Vue.prototype.$warning = msg.msgWarning
Vue.prototype.$info = msg.msgInfo
Vue.prototype.$error = msg.msgError
Vue.prototype.shareConfig = share.shareConfig
Vue.prototype.$echarts = echarts // 引入组件
Vue.config.productionTip = false // 放开是生成模式，注释是开发模式
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$store = store
Vue.prototype.$watermark = watermark
Vue.prototype.$wordlimit = wordlimit

// axios.defaults.baseURL = 'http://192.168.2.89:8012'; //设置ip

Vue.config.silent = false
// eslint-disable-next-line no-unused-vars
const vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
console.log('@@@  vm', vm)
