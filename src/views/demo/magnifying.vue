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
    <el-input ref="refi" v-show="isshow" v-model="inputVal" />
    <el-button @click="click1">按钮</el-button>

  </div>
</template>
<script>
export default {

  data () {
    return {
      srcs: '',
      tableList: [{
        title: '无缝滚动第一行无缝滚动第一行',
        date: '2017-12-16'
      }, {
        title: '无缝滚动第二行无缝滚动第二行',
        date: '2017-12-16'
      }, {
        title: '无缝滚动第三行无缝滚动第三行',
        date: '2017-12-16'
      }, {
        title: '无缝滚动第四行无缝滚动第四行',
        date: '2017-12-16'
      }, {
        title: '无缝滚动第五行无缝滚动第五行',
        date: '2017-12-16'
      }, {
        title: '无缝滚动第六行无缝滚动第六行',
        date: '2017-12-16'
      }, {
        title: '无缝滚动第七行无缝滚动第七行',
        date: '2017-12-16'
      }, {
        title: '无缝滚动第八行无缝滚动第八行',
        date: '2017-12-16'
      }, {
        title: '无缝滚动第九行无缝滚动第九行',
        date: '2017-12-16'
      }],
      isshow: false,
      inputVal: '9999'
    }
  },
  mounted () {
    this.init()
    // this.srcs = JSON.parse(sessionStorage.getItem('file')).url
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
    },
    click1 () {
      // 点击事件后，数据更改后，vue并没有直接去更新模板，而是继续走了设置焦点的方法，再去渲染模板
      this.isshow = true
      // 这个执行了,页面的input还没有在页面显示呢
      this.$refs.refi.focus()
    }

  }
}
</script>
<style lang="less" scoped>
#magnifying {
  .seamless-warp-table {
    width: 400px;
    height: 400px;
    background: red;
    overflow: hidden;
  }
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
