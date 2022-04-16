<template>
  <ul id="slots">
    <li>
      <h1>默认插槽 {{name4}}</h1>
      <defaultSlot>
        <!-- 默认插槽内容 -->
        <div>
          <h2>默认插槽标签+img</h2>
          <img :src="require('@/assets/images/01.jpg')" alt="">
        </div>
      </defaultSlot>
    </li>

    <li>
      <h1>具名插槽</h1>
      <nameSlot>
        <!-- 位置随便放，最后根据插槽的位置来 -->
        <img slot="footer" :src="require('@/assets/images/02.jpg')" alt="">
        <!-- 同名的插槽会追加显示 -->
        <h2 slot="conter">具名插槽内容 h2标签</h2>
        <h2 slot="conter">具名插槽内容 img标签</h2>
        <!-- 具名插槽：旧的写法，会共存 -->
        <template slot="conter">具名插槽内容 template标签</template>
        <!-- 具名插槽：新的写法，不会共存 -->
        <!-- <template v-slot:conter>具名插槽内容 template标签</template> -->
      </nameSlot>
    </li>

    <li>
      <h1>作用域插槽</h1>
      <domainSlot>
        <!-- 作用域插槽必须通过template的scope接收数据 -->
        <template scope="domainData">
          {{domainData}}
          <h4 v-for="i in domainData.games" :key="i">{{i}}</h4>
        </template>
      </domainSlot>
      <domainSlot>
        <!-- 作用域插槽必须通过template的scope接收数据 -->
        <template scope="domainData">
          {{domainData}}
          <span v-for="i in domainData.games" :key="i">{{i}}</span>
        </template>
      </domainSlot>
    </li>
  </ul>
</template>
<script>
import defaultSlot from './components/defaultSlot'
import nameSlot from './components/nameSlot'
import domainSlot from './components/domainSlot'
export default {
  components: {
    defaultSlot,
    nameSlot,
    domainSlot
  },
  data() {
    return {

      name4: '1121'
    }
  }
}
</script>
<style lang="less" scoped>
#slots {
  li {
    float: left;
    width: 300px;
    height: 600px;
    margin-right: 20px;
    background: lightblue;
    h1 {
      margin-bottom: 10px;
      background: gold;
      text-align: center;
    }
    img {
      width: 50%;
    }
  }
}
</style>
