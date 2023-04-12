<template>
  <div id="printer">
    <el-button @click="getPrint">打印全部内容</el-button>

    <!-- 打印指定内容样式会带不上，需内嵌写样式 -->
    <el-button @click="setPrint">打印指定内容</el-button>
    <!-- 指定内容 -->
    <div id="printMe" ref="print">
      <el-input placeholder="input输入" v-model="input"></el-input>
      <div class="divs" style=" width: 200px;height: 20px;border: 1px solid red;margin:10px 0;">大厦会计法</div>
      <img src="../../assets/images/01.jpg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      printObj: {
        id: "printMe", //打印指定内容id
        popTitle: '打印标题',//打印标题
      },
      input: ''
    }
  },
  methods: {
    getPrint () {
      window.print();
    },
    setPrint () {
      this.$print(this.$refs.print)
    }
  }
}
</script>
<style lang="less" scoped>
#printMe {
  margin-top: 20px;
  border: 10px solid red;
}
</style>