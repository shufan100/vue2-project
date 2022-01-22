<template>
  <div class="home rflex">
    <left-menu></left-menu>
    <div class="menu_right wflex">
      <head-nav></head-nav>
      <tags></tags>
      <breadcrumb></breadcrumb>
      <div class="content is-scroll-left" id="contentId">
        <transition name="fade">
          <keep-alive>
            <router-view class="main"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import leftMenu from './leftMenu' // 左边菜单
import headNav from './headNav' // 头部
import breadcrumb from './breadcrumb' // 面包屑
import tags from './tags' // tags

import { mapState } from 'vuex'
import bus from '@/common/bus.js'

export default {
  name: 'Home',
  data () {
    return {
      tagsList: []
    }
  },
  components: {
    leftMenu,
    headNav,
    breadcrumb,
    tags
  },
  computed: {
    ...mapState(['sidebarWidth'])
  },
  created () {
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', (msg) => {
      const arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  },

  mounted () {
    console.log('Home.vue')
    // this.$watermark.set(`SHUFAN`)
    window.addEventListener('message', function (event) {
      if (event.data.type === 'hightLight') {

      }
    })
    function add () {
      // 第一次执行时，定义一个数组专门用来存储所有的参数
      var _args = Array.prototype.slice.call(arguments)

      // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
      var _adder = function () {
        _args.push(...arguments)
        return _adder
      }

      // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
      _adder.toString = function () {
        return _args.reduce(function (a, b) {
          return a + b
        })
      }
      return _adder
    }
    add(1)(2)(3) // 6
    add(1, 2, 3)(4) // 10
    add(1)(2)(3)(4)(5) // 15
    add(2, 6)(1) // 9
    console.log(add(1)(2)(3))
  },
  methods: {
  }
}
</script>
<style scoped lang="less">
// 路由过过渡动画

.fade-enter {
  //进入过渡
  opacity: 0.3;
}
.fade-enter-active {
  // 进入过渡的过渡时间
  transition: opacity 0.5s;
}
.fade-leave {
  //离开过渡
  opacity: 1;
}
.fade-leave-active {
  //离开过渡的过渡时间
  opacity: 0;
  transition: opacity 0.5s;
}
// 进入缩放
// @keyframes startAn {
//     0% {
//         transform: scale(1);
//     }
//     50% {
//         transform: scale(1.2);
//     }
//     100% {
//         transform: scale(1);
//     }
// }
// .fade-enter { //进入过渡
// }
// .fade-enter-active { // 进入过渡的过渡时间
//     // animation: startAn 1s;
// }
// .fade-leave { //离开过渡
//     opacity: 1;
// }
// .fade-leave-active { //离开过渡的过渡时间
//     opacity: 0.2;
//     transition: opacity 1s;
// }
.home {
  width: 100%;
  height: 100%;
  .menu_right {
    flex: 1;
    background: #f0f2f5;
    overflow: hidden;
    .content {
      width: 100%;
      height: calc(100% - 132px);
      overflow-y: scroll;
      overflow-x: hidden;
      border-bottom: 10px solid red;
    }
    .main {
      // min-height: calc(100% - 50px);
      // overflow: hidden;
      overflow: auto;
      height: calc(100% - 50px);
      margin: 0 10px 15px 15px;
      padding: 15px;
      background: #fff;

      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
