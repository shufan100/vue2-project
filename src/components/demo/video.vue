<template>
  <div>
    {{fullname}}<br />
    {{fullname}}<br />
    {{fullname}}<br />
    {{fullname}}<br />
  </div>
</template>
<script>
export default {
  data () {
    return {
      firstName: '张',
      lastName: '三'
    }
  },
  computed: {
    fullname: {
      get () {
        // 多次调用计算属性，会存在缓存里（只触发一次）
        console.log('读取了fullname时，get函数就会调用，且返回fullname的值')
        return this.firstName + this.lastName
      }
    }
  }
}

</script>
