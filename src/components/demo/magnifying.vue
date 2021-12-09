<!-- 放大镜 -->
<template>
  <div class="wrap" id="wrapper">
    <div class="con" id="box">
      <img src="../../assets/images/avatar-3.png" alt id="leftimg" />
      <div class="drap" id="drapper"></div>
    </div>
    <div class="show" id="rightshow">
      <img src="../../assets/images/avatar-3.png" alt id="rightimg" />
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var box = document.getElementById('box')
      var drapper = document.getElementById('drapper') // 放大镜
      var rightshow = document.getElementById('rightshow') // 放大镜展示
      var leftimg = document.getElementById('leftimg')
      var rightimg = document.getElementById('rightimg')

      box.onmouseover = function (e) {
        // 鼠标移上去，就显示出来
        drapper.style.display = 'block'
        rightshow.style.display = 'block'
        // 鼠标移动
        document.onmousemove = function (e) {
          var evt = e || window.event
          var movX = evt.clientX - box.offsetLeft - drapper.offsetWidth / 2
          var movY = evt.clientY - box.offsetTop - drapper.offsetHeight / 2
          var maxX = box.clientWidth - drapper.offsetWidth
          var maxY = box.clientHeight - drapper.offsetHeight

          if (movX < 0) {
            movX = 0
          }

          if (movY < 0) {
            movY = 0
          }

          if (movX >= maxX) {
            movX = maxX
          }

          if (movY >= maxY) {
            movY = maxY
          }

          drapper.style.left = movX + 'px'
          drapper.style.top = movY + 'px'

          // 放大镜的效果
          var num = rightimg.offsetWidth / leftimg.offsetWidth // 原图与放大图的比例
          rightshow.scrollLeft = movX * num // 进行比例移动
          rightshow.scrollTop = movY * num // 进行比例移动
        }
      }

      box.onmouseout = function () {
        document.onmousemove = null // 清除事件
        drapper.style.display = 'none'
        rightshow.style.display = 'none'
      }
    },
    // 根据地址下载图片
    // 下载图片（无需接口）
    downloadImg (item) {
      var name = this.getFileName(item.originUrl)
      var res = new XMLHttpRequest()
      res.open('GET', item.originUrl, true) // 异步请求
      res.responseType = 'blob'
      res.onload = function (e) {
        var blob = new Blob([res.response])
        var a = document.createElement('a') // 页面上创建一个标签
        a.setAttribute('href', URL.createObjectURL(blob)) // 设置a 标签的href，
        a.setAttribute('download', name) // 设置a 标签的download 属性，并限定下载文件名。
        a.click() // 出发a点击事件，下载文件
      }
      res.send()
    }
  }
}
</script>
<style lang="less">
.wrap {
  margin: 0 auto;
}
.wrap h1 {
  height: 60px;
  font: 24px bold;
  text-align: center;
  line-height: 60px;
}
.con {
  position: relative;
  float: left;
  width: 300px;
  height: 300px;
  color: transparent;
  border: 1px solid #f00;
}
.con img {
  display: block;
  width: 300px;
  height: 300px;
}
.drap {
  display: none; /*默认隐藏*/
  position: absolute;
  width: 100px;
  height: 100px;
  background: url('../../assets/images/tz_bg.png');
  cursor: move;
}
.show {
  display: none; /*默认隐藏*/
  overflow: hidden;
  float: left;
  width: 300px;
  height: 300px;
  border: 1px solid #f00;
}
.show img {
  display: block;
  width: 600px;
  height: 600px;
}
</style>
