<template>
  <div id="writing">
    <h1 style="text-align:center">基础语法</h1>
    <a :href="url" @click.prevent="clicks">阻止默认事件</a>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      url: 'https://www.baidu.com/'
    }
  },
  methods: {
    clicks() {
      alert(111)
    }
  }
}
</script>