// 防抖事件---------
import Vue from 'vue'
const preventReClick = Vue.directive('preventReClick', {
  inserted: function (el, binding) {
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
  }
})

export default preventReClick
