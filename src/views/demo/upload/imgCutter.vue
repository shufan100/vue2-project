<template>
  <div id="ImgCutter">
    <ImgCutter ref="cropper" :img="option.img" :rate="option.rate" :outputSize="option.outputSize" :outputType="option.outputType" :info="option.info"
      :canScale="option.canScale" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"
      :fixed="option.fixed" :fixedNumber="option.fixedNumber" :full="option.full" :fixedBox="option.fixedBox" :canMove="option.canMove"
      :canMoveBox="option.canMoveBox" :original="option.original" :centerBox="option.centerBox" :height="option.height" :infoTrue="option.infoTrue"
      :maxImgSize="option.maxImgSize" :enlarge="option.enlarge" :mode="option.mode" :toolBoxOverflow="option.toolBoxOverflow" :isModal="option.isModal"
      :tool="option.tool" :boxWidth="800" :boxHeight="600" :DoNotDisplayCopyright="option.DoNotDisplayCopyright" @realTime="realTime" @imgLoad="imgLoad"
      @onPrintImg="onPrintImg" @cutDown="cutDown"></ImgCutter>
    <img :src="cutterUrl" alt="" />
  </div>
</template>

<script>
export default {
  name: 'adds',
  data() {
    return {
      defaultSrc: require('@/assets/images/01.jpg'),
      cutterUrl: '',
      option: {
        img: '', // 裁剪图片的地址
        rate: '16:9', // 裁剪比例
        outputSize: 1, // 裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'png', // 裁剪生成图片的格式（jpeg || png || webp）
        info: true, // 图片大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 230, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [16, 9], // 截图框的宽高比例
        full: false, // false按原比例裁切图片，不失真
        fixedBox: true, // 固定截图框大小，不允许改变
        canMove: false, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        height: true, // 是否按照设备的dpr 输出等比例图片
        infoTrue: false, // true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, // 限制图片最大宽度和高度
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: '230px 150px', // 图片默认渲染方式
        toolBoxOverflow: false, // 是否允许工具框超出图片范围
        WatermarkText: 'vue-img-cutter', // 水印
        WatermarkTextColor: 'red', // 水印颜色
        isModal: true, // 是否弹窗
        tool: false, // 工具栏
        DoNotDisplayCopyright: true // logo
      }
    }
  },
  mounted() {
    this.openDialog()
  },
  methods: {
    openDialog() {
      this.$nextTick(() => {
        this.$refs.cropper.handleOpen({
          name: 'img',
          src: this.defaultSrc, // bease64url
          width: 400,
          height: 400
        })
      })
    },
    onPrintImg(res) {
      console.log('🚀 ~ file: cutDialog.vue ~ line 65 ~ onPrintImg ~ res', res)
      // 预览图片
    },
    // 确定
    cutDown(file) {
      console.log(file, 'file111111111')
      this.cutterUrl = file.dataURL
    },
    realTime() {},
    imgLoad() {}
  }
}
</script>
<style lang="less" scoped>
#ImgCutter {
  width: 400px;
  height: 300px;
}
</style>
