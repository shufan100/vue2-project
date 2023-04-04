/**
 * @author SHUF
 * @date 2023-04-04 10:36:47
 * @Description 扩展
 */
import qs from 'qs'
// ***** echarts ****
import echarts from 'echarts'
// 文字超出省略号
import { wordlimit } from '@/utils/func'
// 分享功能集合
import * as share from '@/utils/common/share'
// 水印
import watermark from '@/utils/common/watermark'
// 消息订阅
import PubSub from 'pubsub-js'

// 插件
// ***** 打印机 *****
import Print from '@/utils/common/prints'
// ***** 导出pdf *****
import htmlToPdf from '@/utils/common/htmlToPdf'
// 无缝滚动
import scroll from 'vue-seamless-scroll'
// 图片裁剪
// import '@/assets/cropper/cropper.min.css'
// import '@/assets/cropper/ImgCropping.css'
import ImgCutter from 'vue-img-cutter'
//
// 图片预览
import elImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  // Vue：是Vue实例对象
  install(Vue) {
    // 有install方法，vue一定会调用这
    // 这里可以定义一些全局的方法，一般要引Vue
    console.log('有install方法，vue一定会调用这')

    // 全局过滤器
    Vue.filter('winFilter', function (val) {
      return val + 100
    })

    // 全局指令
    Vue.directive('sbind', {
      bind(el, binding) {
        console.log(el, binding)
        console.log('bind')
        el.value = binding.value // 值绑定到节点上
      },
      // 指令所在元素被插入页面时
      inserted(el, binding) {
        console.log('inserted')
        el.focus() // 获取焦点
      },
      // 指令所在的模板被重新解析时(当前模板有数据发生改变渲染模板就会触发)
      update(el, binding) {
        console.log('update')
        el.value = binding.value // 值绑定到节点上
      }
    })

    // 全局混入
    Vue.mixin({
      data: function () {
        return {
          x: 100,
          y: 200,
          mixinName2: 'pluginsJs文件--全局的'
        }
      },
      methods: {
        // 递归修改
        // $setI18nTitle(list) {
        //   const routerObj = {}
        //   // 递归修改i18的对应的title
        //   function fun(arr, parentName = '') {
        //     for (const i of arr) {
        //       if (!routerObj[i.name]) {
        //         if (parentName) {
        //           routerObj[parentName + i.name] = i.meta.title || '1'
        //         } else {
        //           routerObj[i.name] = i.meta.title || '1'
        //         }
        //         if (i?.children) {
        //           fun(i.children, i.name + '/')
        //         }
        //       }
        //     }
        //   }
        //   fun(list)
        //   return routerObj
        // }
      }
    })

    Vue.component('ImgCutter', ImgCutter)
    Vue.component('elImageViewer', elImageViewer)

    Vue.use(scroll).use(ImgCutter).use(Print).use(htmlToPdf)

    // 给Vue原型上添加一个方法（属性）
    Vue.prototype.$name = '全局属性name'
    Vue.prototype.$qs = qs
    Vue.prototype.$wordlimit = wordlimit // 限制文字超出省略号
    Vue.prototype.shareConfig = share.shareConfig
    Vue.prototype.$echarts = echarts // 引入组件
    Vue.config.productionTip = false // 放开是生成模式，注释是开发模式
    Vue.prototype.$watermark = watermark
    Vue.prototype.$pubSub = PubSub

    // axios.defaults.baseURL = 'http://192.168.2.89:8012'; //设置ip

    Vue.config.silent = false
    Vue.prototype.getHello = () => {
      alert('hello!!! 全局方法------pluginsJs文件')
    }
    Vue.prototype.$setI18nTitle = list => {
      const routerObj = {}
      // 递归修改i18的对应的title
      function fun(arr, parentName = '') {
        for (const i of arr) {
          if (!routerObj[i.name]) {
            if (parentName) {
              routerObj[parentName + i.name] = i.meta.title || '1'
            } else {
              routerObj[i.name] = i.meta.title || '1'
            }
            if (i?.children) {
              fun(i.children, i.name + '/')
            }
          }
        }
      }
      fun(list)
      return routerObj
    }
  }
}
