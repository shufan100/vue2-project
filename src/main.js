import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ***** axios *****
import axios from 'axios';
import qs from 'qs';

// ***** element-ui *****
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// ***** 打印机 *****
import Print from './utils/prints'
Vue.use(Print)

// ***** 导出pdf *****
import htmlToPdf from './utils/htmlToPdf'
Vue.use(htmlToPdf)


// ***** echarts ****
import echarts from 'echarts';

// ***** 拖拽指令****
import './common/directives';

// ***** iconfont****
import '@/assets/icon/iconfont.css'

// 路由权限
import './common/routerPermissions.js';
// import '@/common/routerPermissions';

// ***** 中英文 ****
import i18n from '@/lang';

/// 引入iconfont class加iconfont
import '@/assets/icon/iconfont.css'

// 分享功能集合
// import { shareConfig } from './utils/share';
import * as share from './utils/share'

//防多次点击，重复提交
import preventReClick from './utils/preventReClick' 
// Vue.directive("preventReClick", preventReClick);

//图片预览
import elImageViewer from 'element-ui/packages/image/src/image-viewer'
Vue.component("elImageViewer",elImageViewer);


// 弹窗封装
import * as msg from './utils/message'
Vue.prototype.$success = msg.msgSuccess;
Vue.prototype.$warning = msg.msgWarning;
Vue.prototype.$info = msg.msgInfo;
Vue.prototype.$error = msg.msgError;

Vue.prototype.shareConfig = share.shareConfig;
Vue.prototype.$echarts = echarts //引入组件
Vue.config.productionTip = false; //放开是生成模式，注释是开发模式
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

// axios.defaults.baseURL = 'http://192.168.2.89:8012'; //设置ip


Vue.config.silent = false;
const vm = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
