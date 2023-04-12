<template>
  <div>
    <el-button @click="messageClick">防重复提示</el-button>
    <el-button @click="messageClick2">默认提示</el-button>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {}
  },
  mounted() {},
  methods: {
    messageClick() {
      this.$newMessage({
        type: 'success',
        message: '0000'
      })
    },
    messageClick2() {
      this.$message.warning('0000')
    }
  }
}
</script>
<style lang="scss" scoped></style>
