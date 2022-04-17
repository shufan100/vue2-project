import Vue from 'vue'
// 注册防抖事件---------
Vue.directive('preventReClick', {
  // el是真实dom节点 binding数据

  // 指令与元素成功绑定时（一上来）
  bind(el, binding) {
    // console.log('bind')
  },
  // 指令所在元素被插入页面时
  inserted (el, binding) {
    // console.log('inserted', el, binding)
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        var timess = setTimeout(() => {
          el.disabled = false
        }, binding.value || 1000)
        clearTimeout(timess)
        console.log(timess, 'timess')
      }
    })
  },
  // 指令所在的模板被重新解析时(当前模板有数据发生改变渲染模板就会触发)
  update(el, binding) {
    // console.log('update')
  }
})

// 自定义其他指令222
Vue.directive('fbind', {
  bind(el, binding) {
    console.log(el, binding)
    console.log('bind')
    el.value = binding.value // 值绑定到节点上
  },
  // 指令所在元素被插入页面时
  inserted (el, binding) {
    console.log('inserted')
    el.focus() // 获取焦点
  },
  // 指令所在的模板被重新解析时(当前模板有数据发生改变渲染模板就会触发)
  update(el, binding) {
    console.log('update')
    el.value = binding.value // 值绑定到节点上
  }

})
