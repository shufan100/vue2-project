<!-- 防抖指令 -->
<template>
  <div id="antiShake" class="antiShake">
    <el-button v-preventReClick @click="antiShake">防抖多次触发</el-button>
    <p v-for="(item, index) in list" :key="index">{{ item }}</p>
    <br />
    <input type="text" v-fbind:value="val" />
    {{ value }}
    <!-- <el-button @click="postMsg">postMsg</el-button>
    <iframe ref="iframes" class="iframe" src="http://192.168.1.131:3008/"></iframe> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
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
    antiShake() {
      console.dir('1秒触发一次！')
      this.list.push('1秒触发一次！')
      console.log(this.list)
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
