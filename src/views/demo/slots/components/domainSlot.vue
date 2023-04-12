<template>
  <div>
    <!-- 作用域数据games，逆袭传递外层的使用着， -->
    <slot :games='games'> 作用域插槽 </slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      games: ['游戏1', '小游戏', '超级玛丽']
    }
  }
}
</script>
