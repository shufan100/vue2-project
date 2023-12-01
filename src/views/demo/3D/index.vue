<template>
  <div>
    <el-button @click="messageClick">防重复提示</el-button>
    <el-button @click="messageClick2">默认提示</el-button>
    <el-button @click="getData">请求</el-button>
  </div>
</template>
<script>
import { getPageList } from '@/api'
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
    },
    getData() {
      getPageList({})
    }
  }
}
</script>
<style lang="scss" scoped></style>
