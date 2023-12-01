/**
 * @author SHUF
 * @date 2023-04-04 10:33:37
 * @Description 自定义指令
 */

import Vue from 'vue'
// v-dialogDrag: 拖拽指令
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')

    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (() => {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()

    dialogHeaderEl.onmousedown = e => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      const screenWidth = document.body.clientWidth // body当前宽度
      const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)

      const dragDomWidth = dragDom.offsetWidth // 对话框宽度
      const dragDomheight = dragDom.offsetHeight // 对话框高度

      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

      // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, 'left')
      let styT = sty(dragDom, 'top')

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
      } else {
        styL = +styL.replace(/\px/g, '')
        styT = +styT.replace(/\px/g, '')
      }

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

// 防抖：控制计时器  （频繁触发,只在最后一次触发 ）
Vue.directive('debounce', {
  bind(el, binding) {
    let timer
    el.addEventListener('click', () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        binding.value()
      }, 500)
    })
  }
})

// input防抖
// 节流：控制变量 （n秒内触发1次）
Vue.directive('throttle', {
  // el是真实dom节点 binding数据
  // 指令与元素成功绑定时（一上来）
  bind(el, binding) {},
  // 指令所在元素被插入页面时
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (el.disabled) return
      el.disabled = true
      setTimeout(() => {
        el.disabled = false
      }, binding.value || 1000)
    })
  },
  update(el, binding) {} // 指令所在的模板被重新解析时 (当前模板有数据发生改变渲染模板就会触发)
})
// 节流：控制变量 （n秒内触发1次）
Vue.directive('throttle2', {
  // 指令与元素成功绑定时（一上来）
  bind(el, binding) {
    let trigger
    el.addEventListener('click', () => {
      if (trigger) return
      trigger = true
      binding.value()
      setTimeout(() => {
        trigger = false
      }, 1000)
    })
  }
})

// 自定义其他指令222
Vue.directive('fbind', {
  bind(el, binding) {
    el.value = binding.value // 值绑定到节点上
  },
  // 指令所在元素被插入页面时
  inserted(el, binding) {
    el.focus() // 获取焦点
  },
  // 指令所在的模板被重新解析时(当前模板有数据发生改变渲染模板就会触发)
  update(el, binding) {
    console.log(el)
    el.value = binding.value // 值绑定到节点上
  }
})
