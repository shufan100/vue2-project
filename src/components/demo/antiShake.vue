<!-- 自定义指令 -->
<template>
  <div id="antiShake" class="antiShake">
    <h2>节流：控制变量 （n秒内触发1次）</h2>
    <el-button v-throttle @click="antiShake">节流-写法1</el-button>
    <el-button v-throttle2="antiShake">节流-写法2</el-button>
    <el-button v-throttle2="() => antiShake('参数')">节流-写法3</el-button>
    <p v-for="(item, index) in list" :key="index">{{ item }}</p>
    <hr />

    <h2>防抖：控制计时器 （频繁触发,只在最后一次触发 ）</h2>
    <el-button v-debounce="add">防抖-写法1</el-button>
    <el-button v-debounce="() => add('参数1')">防抖-写法2</el-button>
    <div v-for="(item, index) in list2" :key="index">{{ item }}</div>
    <hr />

    <h2>input防抖指令</h2>
    <!-- <el-input v-debounce:search="'input'" v-model="value"></el-input> -->

    <h2>自动聚焦指令</h2>
  <!-- <input type="text" v-fbind:value="val" />
                                    {{ value }} -->


  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      list2: [],
      val: 1,
      value: ''
    }
  },
  created() {
    console.log(window, '00')
  },
  mounted() {
    // this.$watermark.set(`SHUFAN`)
  },
  methods: {
    search() {
      console.log(this.value)
      // console.log(e.target.value)
    },
    antiShake(a = '默认') {
      this.list.push(`节流 1秒触发一次！${a}`)
    },
    add(a = '默认') {
      this.list2.push(`防抖 1秒触发一次！${a}`)
    },
    postMsg() {
      const data = { token: 'f4009a55f2a04d46b7496ff820d3bf81', refreshToken: 'e72851df067241d286a0e39af0fe76ec' }
      // iframe传值
      // this.$refs.iframes.contentWindow.postMessage(data, '*')
      // window.open('http://192.168.1.131:3008/')

      // 直接跳转
      // const targetWindow = window.open('http://192.168.1.97:3010/')
      const targetWindow = window.open('http://192.168.1.131:3008/')
      setTimeout(() => {
        targetWindow.postMessage(data, '*')
      }, 3000)
      // 接收
      // window.addEventListener('message', async (e) => {
      //   if (e.data.token) { }
      // })
    }
  }
}
</script>
<style lang="less" scoped>
#iframes {
  height: 700px;
  width: 1000px;
}
</style>
