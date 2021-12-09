<!-- 防抖指令 -->
<template>
  <div id="antiShake" class="antiShake">
    <el-button v-preventReClick @click="antiShake">防抖多次触发</el-button>
    <p v-for="(item,index) in list" :key="index">{{item}}</p>
  </div>
</template>
<script>

export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    // this.$watermark.set(`SHUFAN`)
  },
  methods: {
    antiShake () {
      console.dir('1秒触发一次！')
      this.list.push('1秒触发一次！')

    }
  }
}
</script>