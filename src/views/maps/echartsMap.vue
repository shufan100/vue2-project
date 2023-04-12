<template>
  <div id="maps">
    <!-- {{ $state }} -->
    {{ sum }}
    <button @click="add">111</button>
    <div id="gdMap"></div>
  </div>
</template>
<script>
import { getToken } from '@/utils/common/jsCookie'
import { mapState, mapActions } from 'vuex'
var map, contextMenuPositon
export default {
  data() {
    return {
      mouseTool: null
    }
  },
  computed: {
    ...mapState({
      info: state => state.func.info,
      isEnglish: state => state.isEnglish
    }),
    ...mapState(['sum'])
  },
  watch: {
    isEnglish() {
      this.getgdMap()
      console.log(this.isEnglish)
    },
    '$store.state.isEnglish': (newval, old) => {
      console.log(newval, old, '==11=')
    },
    sum(newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  },
  mounted() {
    console.log(this.$store.state.isEnglish, '---')

    this.getgdMap()
  },
  methods: {
    ...mapActions(['jiasum']),
    add() {
      this.jiasum(20)
    },
    getgdMap() {
      var lnglat = new AMap.LngLat(116.397428, 39.90923)
      map = new AMap.Map('gdMap', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 11, // 初始化地图层级
        center: lnglat, // [116.397428, 39.90923], //初始化地图中心点 //不给中心点就是当前人所在的市
        lang: 'zh_cn' // 可选值：en，zh_en, zh_cn
      })
      map.setLang(this.isEnglish)
      map.on('complete', () => {
        this.$notify.success('地图加载完成！')
      })
      // 控件
      map.plugin(['AMap.ToolBar'], function () {
        map.addControl(
          new AMap.ToolBar({
            liteStyle: false
          })
        )
      })
      map.plugin(['AMap.Scale'], function () {
        map.addControl(new AMap.Scale())
      })
      map.plugin(['AMap.OverView'], function () {
        map.addControl(new AMap.OverView())
      })

      // 创建右键菜单
      var contextMenu = new AMap.ContextMenu()
      // 右键放大
      contextMenu.addItem(
        '放大一级',
        function () {
          map.zoomIn()
        },
        0
      )
      // 右键缩小
      contextMenu.addItem(
        '缩小一级',
        function () {
          map.zoomOut()
        },
        1
      )
      // 右键显示全国范围
      contextMenu.addItem(
        '缩放至全国范围',
        function (e) {
          map.setZoomAndCenter(4, [108.946609, 34.262324])
        },
        2
      )
      // 右键添加Marker标记
      contextMenu.addItem(
        '添加标记',
        function (e) {
          var marker = new AMap.Marker({
            map: map,
            position: contextMenuPositon // 基点位置
          })
        },
        3
      )
      // 地图绑定鼠标右击事件——弹出右键菜单
      map.on('rightclick', function (e) {
        contextMenu.open(map, e.lnglat)
        contextMenuPositon = e.lnglat
      })
    }
  }
}
</script>
<style lang="less" scoped>
#maps {
  #gdMap {
    width: 100%;
    height: 100%;
    background: #f1f1f1;
  }
}
</style>
