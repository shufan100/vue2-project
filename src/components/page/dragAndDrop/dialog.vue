<template>
  <div class="dialog" id="dialog">
    <div class="container">
      <p>通过指令 v-dialogDrag 使 Dialog 对话框具有可拖拽的功能。</p>
      <br />
      <el-button type="primary" @click="visible = true;">点我弹框</el-button>
    </div>
    <el-dialog v-dialogDrag title="拖拽弹框" center :visible.sync="visible" width="30%">
      我是一个可以拖拽的对话框！
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <div id="wrap"> -->
    <div id="box">拖拽DIV</div>
    <div id="box2">拖拽DIV2</div>
    <div id="box3">拖拽DIV3</div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    var box = document.getElementById('box')
    var box2 = document.getElementById('box2')
    var box3 = document.getElementById('box3')
    this.moves(box, 'blue')
    this.moves(box2, 'yellow')
    this.moves(box3, 'green')
  },
  methods: {
    moves (boxs, colors) {
      var wrap = document.getElementById('dialog')
      var box = boxs
      box.onmousedown = function (event) {
        // 设置样式
        box.style.cursor = 'move'
        box.style.backgroundColor = 'red'
        // 鼠标点击的坐标
        var evt = event || window.event
        // if (evt.preventDefault) {
        //     evt.preventDefault();
        // } else {
        //     evt.returnValue = false;
        // }
        var mouseX = evt.clientX // 鼠标点击点距离浏览器可视窗口左的坐标
        var mouseY = evt.clientY // 鼠标点击点距离浏览器可视窗口上的坐标
        console.log(mouseX, mouseY)

        var disX = mouseX - box.offsetLeft // 减 网页被卷去的左
        var disY = mouseY - box.offsetTop // 减 网页被卷去的高
        console.log(box.offsetLeft, box.offsetTop)

        document.onmousemove = function (event) {
          var evt = event || window.event
          // if (evt.preventDefault) {
          //     evt.preventDefault();
          // } else {
          //     evt.returnValue = false;
          // }

          var endX = evt.clientX
          var endY = evt.clientY

          // 计算移动后的左偏移量和顶部的偏移量
          var posX = endX - disX
          var posY = endY - disY

          if (posX <= 0) {
            posX = 0
          }
          if (posY <= 0) {
            posY = 0
          }
          console.log(wrap.clientWidth, 'wrap.clientWidth')
          if (posX >= wrap.clientWidth - box.offsetWidth) {
            posX = wrap.clientWidth - box.offsetWidth
          }
          if (posY >= wrap.clientHeight - box.offsetHeight) {
            posY = wrap.clientHeight - box.offsetHeight
          }
          box.style.left = posX + 'px'
          box.style.top = posY + 'px'
        }
      }
      box.onmouseup = function () {
        // 清除鼠标绑定移动事件
        document.onmousemove = null
        box.style.cursor = 'default'
        box.style.backgroundColor = colors
      }
    }
  }
}
</script>
<style lang="less">
.dialog {
  position: relative;
  border: 1px solid red;
  #wrap {
    position: relative;
    width: 500px;
    height: 500px;
    border: 1px solid red;
    margin: 10px;
  }
  #box,
  #box2,
  #box3 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100px;
    height: 100px;
    color: #fff;
    background-color: blue;
    font-size: 14px;
    line-height: 100px;
    text-align: center;
    border-radius: 50%;
  }
  #box2 {
    left: 150px;
    top: 150px;
    color: #000;
    background: yellow;
  }
  #box3 {
    left: 100px;
    top: 150px;
    background: green;
  }
}
</style>
