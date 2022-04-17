export default {
  // Vue：是Vue实例对象
  install(Vue) {
    // 有install方法，vue一定会调用这
    // 这里可以定义一些全局的方法，一般要引Vue
    console.log('有install方法，vue一定会调用这')

    // 全局过滤器
    Vue.filter('winFilter', function(val) {
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

    // 全局混入
    Vue.mixin({
      data: function() {
        return {
          x: 100,
          y: 200,
          mixinName2: 'pluginsJs文件--全局的'
        }
      }
    })

    // 给Vue原型上添加一个方法（属性）
    Vue.prototype.$name = '全局属性name'
    Vue.prototype.getHello = () => {
      alert('hello!!! 全局方法------pluginsJs文件')
    }
  }
}
