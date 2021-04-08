<template>
  <div id="antiShake">
    <el-button v-preventReClick @click="cc">防抖</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    cc () {
      console.log(1111)
    }
  }
}
</script>
