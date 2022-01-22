<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  // 随便写的注释111
  mounted () {
    console.log('app.vue')
  }
}
</script>

<style lang="less">
@color: yellow;
@import './assets/style/common';
@import './assets/style/scrollBar';
@import './assets/style/element-ui';
</style>
