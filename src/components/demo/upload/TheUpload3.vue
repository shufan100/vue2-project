<template>
  <!-- 裁剪上传 -->
  <div id="uploads">
    <el-upload
      class="avatar-uploader"
      :style="{ width, height }"
      action="#"
      :multiple="false"
      :show-file-list="false"
      :drag="true"
      :accept="accept"
      :http-request="httpRequest"
    >
      <div class="avatar-uploader-tip">
        <img v-if="cropperUrl" :src="cropperUrl" class="avatar-uploader-img" />
        <slot v-else></slot>
      </div>
    </el-upload>
    <!-- 原生上传图片方法 -->
    <input v-show="false" ref="upload3" :accept="accept" type="file" @change="changeFile" hidden />

    <el-dialog :visible.sync="dialogShow" :before-close="closeDialog" :close-on-click-modal="false" center title="裁剪图案" width="520px">
      <div v-if="dialogShow" class="cropper-box">
        <div class="cropper-tailor">
          <span>裁剪区</span>
          <img v-show="false" ref="image" :src="imageUrl" alt="" />
          <span v-if="imageUrl" class="btn" @click="$refs.upload3.click()">重新上传</span>
        </div>
        <div class="cropper-preview">
          <span>预览区</span>
          <div class="before" />
        </div>
      </div>
      <el-button @click="closeDialog" size="mini">取消</el-button>
      <el-button v-preventReClick type="primary" size="mini" @click="save">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadOSS } from '@/utils/ossUpload.js'
export default {
  props: {
    // 上传框大小
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    // 图片尺寸
    imgW: {
      type: Number,
      default: 600
    },
    imgH: {
      type: Number,
      default: 600
    },
    // 上传类型
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png,.JPG,.JPEG,.PNG'
    },
    aspectRatio: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dialogShow: false,
      cropperUrl: '', // 裁剪后的地址
      imageUrl: '', // 选择图片的地址
      imageName: '', // 选择图片的名称
      myCropper: null // 裁剪实例
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 原生上传回调
    changeFile(e) {
      console.log(e.target.files, '--')
      this.httpRequest({ file: e.target.files[0] })
    },
    // 上传自定义回调
    async httpRequest(option) {
      const data1 = await uploadOSS(option.file, 'design')
      console.log(data1, '------')
      // 校验大小
      if (option.file.size > 20 * 1024 * 1024 * 1024) return this.$message.warning('限制20M图片')
      // 校验格式
      if (!this.accept.includes(option.file.type.split('/')[1])) return this.$message.warning(`格式限制：${this.accept}`)
      // 校验尺寸
      const reader = new FileReader() // file转bese64
      const image = new Image()
      reader.readAsDataURL(option.file)
      reader.onload = () => {
        image.src = reader.result
        image.onload = () => {
          // 符合尺寸
          if (image.width >= this.imgW && image.height >= this.imgH) {
            this.dialogShow = true
            this.imageUrl = reader.result
            // this.imageName = option.file.name.split('.')[0]
            this.imageName = option.file.name
            console.log(option)
            if (this.myCropper) {
              this.myCropper.replace(this.imageUrl)
            } else {
              this.init()
            }
          } else {
            this.$message.warning(`请上传尺寸大于${this.imgW}*${this.imgH}的图片`)
          }
        }
      }
    },
    // 初始化裁剪实例
    async init() {
      await this.$nextTick()
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1, // 0：没有限制;1:裁剪框必须在图片内移动；2：2图片 不全部铺满1；3：图片填充整个裁剪框
        dragMode: 'move', // ‘crop’: 可以产生一个新的裁剪框, ‘move’: 只可以移动,  ‘none’: 什么也不处理
        preview: '.before', // 预览弹窗
        background: false,
        autoCropArea: 1, // 裁剪框跟图片成1:1
        zoomOnWheel: true,
        aspectRatio: this.aspectRatio // 裁剪比例 16/9
      })
    },
    // 裁剪--确定
    save() {
      const arr = [
        { width: 1600, height: 900 },
        { width: 800, height: 600 },
        { width: 600, height: 600 }
      ]
      const arrIndex = this.aspectRatio > 1.5 ? 0 : this.aspectRatio > 1 ? 1 : 2
      // 获取被裁剪后的canvas
      // const canvasImg = this.myCropper.getCroppedCanvas({
      //   minWidth: arr[arrIndex].width, // 裁剪后的长宽
      //   minHeight: arr[arrIndex].height
      // })
      this.cropperUrl = this.myCropper
        .getCroppedCanvas({
          minWidth: arr[arrIndex].width, // 裁剪后的长宽
          minHeight: arr[arrIndex].height,
          imageSmoothingQuality: 'high'
        })
        .toDataURL('image/png')
      const file11 = this.dataURLtoBlob(this.cropperUrl)
      console.log(file11, 'file11')
      // console.log(canvasImg, this.cropperUrl)
      this.closeDialog()
    },
    closeDialog() {
      this.dialogShow = false
      this.myCropper = null
    },

    //
    // 将base64转换为blob
    dataURLtoBlob(dataurl) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const blob = new Blob([u8arr], { type: mime })
      return this.blobToFile(blob)
    },
    // 将blob转换为file
    blobToFile(theBlob) {
      theBlob.lastModifiedDate = new Date()
      theBlob.name = this.imageName
      return theBlob
    }
  }
}
</script>

<style lang="less">
#uploads {
  overflow: hidden;
  margin-right: 20px;
  .avatar-uploader {
    float: left;
    .el-upload {
      overflow: hidden;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      box-sizing: border-box;
      .el-upload-dragger {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-tip {
      i {
        font-size: 28px;
        color: #8c939d;
        font-weight: bolder;
      }
      p {
        color: #999;
        font-size: 14px;
      }
      .avatar-uploader-img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }

  // 裁剪
  // .cropper-container {
  //   width: 300px !important;
  //   height: 300px !important;
  // }
  .cropper-box {
    display: flex;
    justify-content: space-between;
    height: 360px;
    .cropper-tailor {
      /* 裁剪图片 */
      width: 280px;
      height: 280px;
      border-radius: 4px;
      .btn {
        display: block;
        width: 100%;
        height: 36px;
        margin-top: 10px;
        border: 1px solid #849ff9;
        font-size: 14px;
        color: #2858f8;
        line-height: 36px;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        box-sizing: border-box;
      }
    }
    .cropper-preview {
      .before {
        width: 160px;
        height: 160px;
        border: 1px solid #d9d9d9;
        overflow: hidden;
        /* 这个属性可以得到想要的效果 */
      }
    }
  }
}
</style>
