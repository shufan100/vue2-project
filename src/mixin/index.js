// 在mixin写公共的方法，在想要用的组件引入或者全局引用，这样所有的组件都可以用mixin里的方法
export default {
  data () {
    // 所有组件都有这个数据
    return {
      mixinName: 'mixin'
    }
  },
  // 所有组件的生命周期都有加想要加的东西
  created () {
    // this.hello()
  },
  // 所有组件都有这些方法
  methods: {
    hello () {
      console.log('hello from mixin')
    },
    func_one () {
      const a = '1221'
      console.log('func_one from mixin')
    },
    func_two () {
      console.log('func_two from mixin')
    }
  }
}
