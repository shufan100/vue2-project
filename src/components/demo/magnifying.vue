<!-- 放大镜 -->
<template>
  <div class="wrap" id="magnifying">
    <div class="con" id="box11">
      <img src="../../assets/images/img5.jpg" alt id="leftimg11" />
      <div class="drap" id="drapper11"></div>
    </div>
    <div class="show" id="rightshow11">
      <img src="../../assets/images/img5.jpg" alt id="rightimg11" />
    </div>

    <img :src="srcs" alt="">
  </div>
</template>
<script>
export default {
  data () {
    return {
      srcs: ''
    }
  },
  mounted () {
    this.init()
    console.log(111111)
    this.srcs = JSON.parse(sessionStorage.getItem('file')).url
  },
  methods: {
    init () {
      const box = document.getElementById('box11')
      const drapper = document.getElementById('drapper11') // 放大镜
      const rightshow = document.getElementById('rightshow11') // 放大镜展示
      const leftimg = document.getElementById('leftimg11')
      const rightimg = document.getElementById('rightimg11')

      box.onmouseover = function (e) {
        // 鼠标移上去，就显示出来
        drapper.style.display = 'block'
        rightshow.style.display = 'block'
        // 鼠标移动
        document.onmousemove = function (e) {
          // clientX：当鼠标事件发生时，鼠标相对于浏览器（这里说的是浏览器的有效区域）x轴的位置；
          // clientY：当鼠标事件发生时，鼠标相对于浏览器（这里说的是浏览器的有效区域）y轴的位置；
          // offsetLeft：获取该元素对应父容器的左边距；
          // offsetTop：获取该元素对应父容器的上边距；

          const evt = e || window.event
          let movX = evt.clientX - box.offsetLeft - drapper.offsetWidth / 2
          let movY = evt.clientY - box.offsetTop - drapper.offsetHeight / 2
          const maxX = box.clientWidth - drapper.offsetWidth
          const maxY = box.clientHeight - drapper.offsetHeight
          // console.log(evt.clientX, box.offsetLeft, movX)

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
          const num = rightimg.offsetWidth / leftimg.offsetWidth // 原图与放大图的比例
          rightshow.scrollLeft = movX * num // 进行比例移动
          rightshow.scrollTop = movY * num // 进行比例移动
        }
      }

      box.onmouseout = function () {
        document.onmousemove = null // 清除事件
        drapper.style.display = 'none'
        rightshow.style.display = 'none'
      }
    }

  }
}
</script>
<style lang="less" scoped>
#magnifying {
  .con {
    position: relative;
    float: left;
    width: 300px;
    height: 300px;
    color: transparent;
    border: 1px solid #f00;
    img {
      display: block;
      width: 300px;
      height: 300px;
    }
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
    img {
      display: block;
      width: 600px;
      height: 600px;
    }
  }
}
</style>
