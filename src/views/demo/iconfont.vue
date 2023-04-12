<template>
  <div id="iconfontShow">
    <ul>
      <li v-for="(i, index) of list" :key="index">
        <i :class="['iconfont', i.fontClass]"></i>
        <span>{{ i.fontClass }}</span>
        <span>{{ i.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { fontClass: 'iconyichexiao', name: '已撤销' },
        { fontClass: 'iconzizhizhengshu', name: '资质证书' },
        { fontClass: 'icongongsi', name: '公司' },
        { fontClass: 'iconshigongzhong', name: '施工中' },
        { fontClass: 'iconyijujue', name: '已拒绝' },
        { fontClass: 'iconyitongguo', name: '已通过' },
        { fontClass: 'iconshenfenrenzheng', name: '身份认证' },
        { fontClass: 'iconriqi', name: '公共-日期' },
        { fontClass: 'iconfuzeren', name: '负责人' },
        { fontClass: 'iconshigong1', name: '施工' },
        { fontClass: 'iconcaidan', name: '菜单' },
        { fontClass: 'iconcontract2-fill', name: '合同' },

        { fontClass: 'iconyichexiao', name: '已撤销' },
        { fontClass: 'iconzizhizhengshu', name: '资质证书' },
        { fontClass: 'icongongsi', name: '公司' },
        { fontClass: 'iconshigongzhong', name: '施工中' },
        { fontClass: 'iconyijujue', name: '已拒绝' },
        { fontClass: 'iconyitongguo', name: '已通过' },
        { fontClass: 'iconshenfenrenzheng', name: '身份认证' },
        { fontClass: 'iconriqi', name: '公共-日期' },
        { fontClass: 'iconfuzeren', name: '负责人' },
        { fontClass: 'iconshigong1', name: '施工' },
        { fontClass: 'iconcaidan', name: '菜单' },
        { fontClass: 'iconcontract2-fill', name: '合同' },

        { fontClass: 'iconyichexiao', name: '已撤销' },
        { fontClass: 'iconzizhizhengshu', name: '资质证书' },
        { fontClass: 'icongongsi', name: '公司' },
        { fontClass: 'iconshigongzhong', name: '施工中' },
        { fontClass: 'iconyijujue', name: '已拒绝' },
        { fontClass: 'iconyitongguo', name: '已通过' },
        { fontClass: 'iconshenfenrenzheng', name: '身份认证' },
        { fontClass: 'iconriqi', name: '公共-日期' },
        { fontClass: 'iconfuzeren', name: '负责人' },
        { fontClass: 'iconshigong1', name: '施工' },
        { fontClass: 'iconcaidan', name: '菜单' },
        { fontClass: 'iconcontract2-fill', name: '合同' },

        { fontClass: 'iconyichexiao', name: '已撤销' },
        { fontClass: 'iconzizhizhengshu', name: '资质证书' },
        { fontClass: 'icongongsi', name: '公司' },
        { fontClass: 'iconshigongzhong', name: '施工中' },
        { fontClass: 'iconyijujue', name: '已拒绝' },
        { fontClass: 'iconyitongguo', name: '已通过' },
        { fontClass: 'iconshenfenrenzheng', name: '身份认证' },
        { fontClass: 'iconriqi', name: '公共-日期' },
        { fontClass: 'iconfuzeren', name: '负责人' },
        { fontClass: 'iconshigong1', name: '施工' },
        { fontClass: 'iconcaidan', name: '菜单' },
        { fontClass: 'iconcontract2-fill', name: '合同' },

        { fontClass: 'iconyichexiao', name: '已撤销' },
        { fontClass: 'iconzizhizhengshu', name: '资质证书' },
        { fontClass: 'icongongsi', name: '公司' },
        { fontClass: 'iconshigongzhong', name: '施工中' },
        { fontClass: 'iconyijujue', name: '已拒绝' },
        { fontClass: 'iconyitongguo', name: '已通过' },
        { fontClass: 'iconshenfenrenzheng', name: '身份认证' },
        { fontClass: 'iconriqi', name: '公共-日期' },
        { fontClass: 'iconfuzeren', name: '负责人' },
        { fontClass: 'iconshigong1', name: '施工' },
        { fontClass: 'iconcaidan', name: '菜单' },
        { fontClass: 'iconcontract2-fill', name: '合同' }
      ]
    }
  }
}
</script>
<style lang="less">
#iconfontShow {
  ul {
    // border-left: 1px solid #eee;
    // border-top: 1px solid #eee;
    margin-bottom: 10px;
    text-align: center;
    margin: auto;
    li {
      width: 120px;
      height: 100px;
      float: left;
      padding: 30px 9px 10px 9px;
      text-align: center;
      color: #666;
      font-size: 13px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      border-left: 1px solid #eee;
      border-top: 1px solid #eee;
      margin-right: -1px;
      margin-bottom: -1px;
      i {
        font-size: 40px;
        line-height: 30px;
      }
      span {
        display: block;
        width: 100%;
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }
}
</style>
