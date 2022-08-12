<template>
  <div>
    <h2>elementUI--上传图片（bug：多张会多个提示）</h2>
    <el-collapse v-model="activeName">
      <el-collapse-item title="单张上传" name="1">
        <div style="display:flex">
          <TheUpload width="200px" height="200px" :imgW="800" :imgH="800">
            <div>
              <i class="el-icon-plus"></i>
              <p>点击/拖拽上传图片</p>
              <p>不小于（800*800）</p>
            </div>
          </TheUpload>
          <TheUpload width="180px" height="180px" :imgW="800" :imgH="800">
            <div>
              <i class="el-icon-plus"></i>
              <p>点击/拖拽上传图片</p>
              <p>不小于（600*600）</p>
            </div>
          </TheUpload>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="activeName">
      <el-collapse-item title="多张上传" name="1">
        <TheUpload :multiple="true" width="160px" height="160px" :imgW="800" :imgH="800" @getUrlList="getUrlList">
          <div>
            <i class="el-icon-plus"></i>
            <p>点击/拖拽上传图片</p>
            <p>不小于（800*800）</p>
          </div>
        </TheUpload>
      </el-collapse-item>
    </el-collapse>

    <h2>原生上传图片</h2>
    <el-collapse v-model="activeName">
      <el-collapse-item title="单张上传" name="2">
        <TheUpload2 :multiple="false" width="160px" height="160px" :imgW="800" :imgH="800" @getUrlList="getUrlList">
          <div>
            <i class="el-icon-plus"></i>
            <p>点击/拖拽上传图片</p>
            <p>不小于（800*800）</p>
          </div>
        </TheUpload2>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="activeName">
      <el-collapse-item title="多张上传" name="2">
        <TheUpload2 :multiple="true" width="160px" height="160px" :imgW="50" :imgH="50" @getUrlList="getUrlList">
          <div>
            <i class="el-icon-plus"></i>
            <p>点击/拖拽上传图片</p>
            <p>不小于（50*50）</p>
          </div>
        </TheUpload2>
      </el-collapse-item>
    </el-collapse>
    <!-- --------------------------- -->

    <h2>上传裁剪图片（单张）</h2>
    <el-collapse v-model="activeName">
      <el-collapse-item title="裁剪上传（vue-cropperjs）" name="3">
        <img :src="cropImg" class="pre-img" />
        <el-button @click="$refs.upload.click()">裁剪图片</el-button>
        <input ref="upload" accept="image/*" type="file" @change="setImage" hidden style="display: none;" />
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="activeName">
      <el-collapse-item title="裁剪上传（cropperjs）" name="3">

        原图地址：{{origUrl1}}<br />
        裁剪地址：{{tailorUrl1}}<br />
        <TheUpload3 ref="upload1" :tailorUrl.sync="tailorUrl1" :origUrl.sync='origUrl1' width="360px" height="200px" :imgW="800" :imgH="800"
          :aspectRatio="16 / 9">
          <i class="el-icon-plus"></i>
          <p class="el-upload__text">点击/拖拽上传图片</p>
          <p class="el-upload__text">比例=16：9</p>
        </TheUpload3>

        <br />

        原图地址：{{origUrl2}}<br />
        裁剪地址：{{tailorUrl2}}<br />
        <TheUpload3 ref="upload2" :tailorUrl.sync="tailorUrl2" :origUrl.sync='origUrl2' width="200px" height="200px" :imgW="800" :imgH="800" :aspectRatio="1">
          <i class="el-icon-plus"></i>
          <p class="el-upload__text">点击/拖拽上传图片</p>
          <p class="el-upload__text">比例=1：1</p>
        </TheUpload3>
      </el-collapse-item>
    </el-collapse>

    <ImgCutters />
  </div>
</template>

<script>
import axios from 'axios'
import ImgCutters from './imgCutter.vue'
import TheUpload from './TheUpload.vue'
import TheUpload2 from './TheUpload2.vue'
import TheUpload3 from './TheUpload3.vue'
export default {
  name: 'upload',
  data() {
    return {
      urlList: [],
      activeName: '3',
      defaultSrc: require('../../../assets/images/img.jpg'),
      fileList: [],
      imgSrc: '',
      cropImg: '',
      dialogImageUrl: '',
      dialogVisible: true,
      disabled: false,

      cover1: '',
      coverCropper1: '',
      cover2: '',
      coverCropper2: '',
      cover3: '',
      coverCropper3: '',
      policyData: {},

      option: {
        img: '', // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'jpeg', // 裁剪生成图片的格式（jpeg || png || webp）
        info: true, // 图片大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 230, // 默认生成截图框宽度
        // autoCropHeight: 150, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [16, 9], // 截图框的宽高比例
        full: false, // false按原比例裁切图片，不失真
        fixedBox: true, // 固定截图框大小，不允许改变
        canMove: false, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        height: true, // 是否按照设备的dpr 输出等比例图片
        infoTrue: false, // true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, // 限制图片最大宽度和高度
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: '230px 150px' // 图片默认渲染方式
      },
      tailorUrl1: '',
      origUrl1: '',
      tailorUrl2: '',
      origUrl2: ''
    }
  },
  components: {
    // VueCropper,
    ImgCutters,
    // uploadCom,
    TheUpload,
    TheUpload2,
    TheUpload3
  },
  created() {
    this.cropImg = this.defaultSrc
  },
  methods: {
    getUrlList(list) {
      console.log(list)
      this.urlList = list
    },
    getUrl(data) {
      if (data.type === 'coverImg1') {
        this.cover1 = data.originalUrl
        this.coverCropper1 = data.cropperUrl
      }
      if (data.type === 'coverImg2') {
        this.cover2 = data.originalUrl
        this.coverCropper2 = data.cropperUrl
      }
      if (data.type === 'coverImg3') {
        this.cover3 = data.originalUrl
        this.coverCropper3 = data.cropperUrl
      }
    },
    setImage(e) {
      const file = e.target.files[0]
      if (!file.type.includes('image/')) {
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        this.dialogVisible = true
        this.imgSrc = event.target.result
        this.$refs.cropper && this.$refs.cropper.replace(event.target.result)
      }
      reader.readAsDataURL(file)
    },
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    cancelCrop() {
      this.dialogVisible = false
      this.cropImg = this.defaultSrc
    },
    imageuploaded(res) {
      console.log(res)
    },
    handleError() {
      this.$notify.error({
        title: '上传失败',
        message: '图片上传接口上传失败，可更改为自己的服务器接口'
      })
    },
    handleChange(file) {
      sessionStorage.setItem('file', JSON.stringify(file))
      this.$router.push('/magnifying')
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    handleDownload(file) {
      console.log(file)
    },

    // 确定
    confirm() {
      this.dialogVisible = false
      console.log(this.imgSrc, 'imgSrc')
    },

    // 下载文件
    async exports() {
      const data = {
        cityId: this.formInline.cityId,
        countyId: this.formInline.countyId,
        currPage: this.page.pageCurr,
        pageSize: this.page.pageSize,
        iscId: this.loginInfo.iscId
      }
      this.downloadModule(data, 'quality/exportStageProgressCompare')
    },
    async downloadModule(data, url) {
      axios({
        url: `${window.SERVER_URL}${url}`,
        method: 'post',
        responseType: 'blob',
        data: data
      }).then(function (res) {
        const blob = new Blob([res.data], {
          type: 'application/json;charset=UTF-8'
        })
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(blob) // 创建下载的链接
        downloadElement.href = href
        downloadElement.download = '分期数据治理对比统计.xls' // 下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放掉blob对象
      })
    }
  }
}
</script>

<style scoped>
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.pre-img {
  display: block;
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 5px;
}
.crop-demo {
  display: flex;
  align-items: flex-end;
}
.crop-demo-btn {
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  margin-left: 30px;
  background-color: #409eff;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
}
.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
