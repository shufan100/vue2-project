<template>
  <div class="audit-dialog-container">
    <el-dialog :visible.sync="show" :before-close="closeDialog" :close-on-click-modal="false" center title="裁剪图案" width="520px">
      <div class="dialog-wrap tailoring-box-parcel">
        <img class="tailoringImg" ref="tailoringImg" />
      </div>
      <template slot="footer">
        <el-button @click="$emit('clickUploadFile')" size="mini">重新上传</el-button>
        <el-button @click="closeDialog" size="mini">取消</el-button>
        <el-button @click="save" type="primary" size="mini">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
import { uploadOSS } from '@/utils/ossUpload'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  props: {
    show: {
      required: true,
      type: Boolean
    },
    aspectRatio: {
      type: Number,
      default: 1 / 1
    }
  },
  data() {
    return {
      cutDown: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20211110/ge3dgnrvgeztkmjtgu4teojvgi4teltkobswoxzsha2xqmrygu.jpg',
      option: {
        img: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20211110/ge3dgnrvgeztkmjtgu4teojvgi4teltkobswoxzsha2xqmrygu.jpg',
        size: '',
        outputType: 'png'
      },
      file: null,
      policyData: {},
      imgData: {}
    }
  },
  mounted() {},
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'move',
        // initialAspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 1,
        zoomOnWheel: true,
        aspectRatio: this.autoCropWidth / this.autoCropHeight
      })
    },
    // 获取阿里云信息
    GenPostPolicy() {
      axios
        .post('http://192.168.1.97:5008/Basic/Support/GenPostPolicy', {
          data: {
            module: 'CUMS',
            upfilePath: 'OA'
          },
          sign: 'B99DD86F2011A98622A37F472570B5C4',
          sysName: 'Front_CUMS',
          ts: '1647934436000',
          version: '1.0.0'
        })
        .then(res => {
          this.policyData = res.data.data
        })
    },
    init1(url, data) {
      console.log(this.aspectRatio, 'aspectRatio====')
      this.$nextTick(() => {
        // this.imgData = data
        const tailoringImgs = document.getElementById('tailoringImg')
        var cropper = new Cropper(tailoringImgs, {
          // $('.tailoringImg').cropper({
          viewMode: 1, // 0：没有限制;1:裁剪框必须在图片内移动；2：2图片 不全部铺满1；3：图片填充整个裁剪框
          cropBoxResizable: true, //
          autoCropArea: 1, // 裁剪框跟图片成1:1
          aspectRatio: this.aspectRatio,
          dragMode: 'move', // ‘crop’: 可以产生一个新的裁剪框, ‘move’: 只可以移动,  ‘none’: 什么也不处理
          toggleDragModeOnDblclick: false // 当点击两次时可以在“crop”和“move”之间切换拖拽模式，
        })
        // $('.tailoringImg').cropper('replace', url, false)
        cropper.replace(url)
      })
      this.GenPostPolicy()
    },

    // 确定按钮，先执行业务，完了调关闭方法，不要写两次关闭方法
    save() {
      this.$emit('closeDialog')
      const arr = [
        { width: 800, height: 450 },
        { width: 800, height: 600 },
        { width: 600, height: 600 }
      ]
      const arrIndex = this.aspectRatio > 1.5 ? 0 : this.aspectRatio > 1 ? 1 : 2
      console.log(arrIndex, 'arrIndex')
      // 获取被裁剪后的canvas
      console.log(arr[arrIndex].width, arr[arrIndex].height)
      var cas = $('.tailoringImg').cropper('getCroppedCanvas', {
        width: arr[arrIndex].width, // 裁剪后的长宽
        height: arr[arrIndex].height
      })
      this.upload(cas)
    },
    async upload(cas, cas2) {
      // oss直传到服务器
      var _this = this
      if (!HTMLCanvasElement.prototype.toBlob) {
        // 解决IE不兼容toBolob
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
          value: function(callback, type, quality) {
            var canvas = this
            setTimeout(function() {
              var binStr = atob(canvas.toDataURL(type, quality).split(',')[1])
              var len = binStr.length
              var arr = new Uint8Array(len)
              for (var i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i)
              }
              callback(new Blob([arr], { type: type || 'image/png' }))
            })
          }
        })
      }

      // 截图
      cas.toBlob(blob => {
        blob.timestamp = new Date().getTime().toString() + Math.floor(Math.random() * 100000) // 给图片添加一个时间戳
        var formData = new FormData()
        formData.append('key', _this.calculate_object_name(blob))
        formData.append('policy', _this.policyData.policy)
        formData.append('OSSAccessKeyId', _this.policyData.accessId)
        formData.append('success_action_status', 200)
        formData.append('Signature', _this.policyData.signAture)
        // formData.append("file", blob, _this.imgData.name.split('.')[0]);
        formData.append('file', blob)
        formData.append('userId', '0')

        _this.$axios.post(_this.policyData.host, formData).then(res => {
          console.log('http://tu.chdesign.cn/' + _this.calculate_object_name(blob), '截图Url----')
          const url = 'http://tu.chdesign.cn/' + _this.calculate_object_name(blob)
          _this.$emit('tailorImgUrl', url)
        })
      }, 'image/png')
    },

    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
    },

    // 生成图片路径
    calculate_object_name(blobData) {
      var suffix = this.get_suffix(blobData.type)
      var g_object_name = this.policyData.dir + blobData.timestamp + '.' + suffix
      // Filenames[blobData.timestamp] = "/" + g_object_name;
      return g_object_name
    },
    get_suffix(type) {
      var pos = type.lastIndexOf('/')
      var suffix = ''
      if (pos != -1) {
        suffix = type.substring(pos + 1)
      }
      return suffix
    },

    // ImgCutter插件相关方法------------------
    // 打开弹窗

    // 上传阿里云
    uploadAli() {
      const nfile = this.file
      nfile.timestamp = new Date().getTime().toString() + Math.floor(Math.random() * 100000) // 给图片添加一个时间戳
      const formData = new FormData() // 注意formData里append添加的键的大小写

      const policyData = this.policyData

      formData.append('key', this.calculate_object_name1(nfile)) // 存储在oss的文件路径
      formData.append('OSSAccessKeyId', policyData.accessId) // accessKeyId
      formData.append('policy', policyData.policy) // policy
      formData.append('Signature', policyData.signAture) // 签名
      // // 如果是base64文件，那么直接把base64字符串转成blob对象进行上传就可以了
      formData.append('file', nfile)
      formData.append('success_action_status', 200) // 成功后返回的操作码
      console.log(policyData, 'policyData')

      axios.post(policyData.host, formData).then(res => {
        if (res.status === 200) {
          const url = 'http://tu.chdesign.cn/' + this.calculate_object_name1(nfile)
          this.$emit('tailorImgUrl', url)
          console.log(url, '00')
        }
      })
    },
    catchError(res) {
      window.alert(res.msg)
    },
    searchCutDown(file) {
      console.log('🚀 ~ searchCutDown', file)
      const reader = new FileReader()
      reader.readAsDataURL(file.file)
      reader.onload = result => {
        // 图片base64化
        sessionStorage.setItem(
          'search_image',
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem('search_image')),
            name: file.name,
            url: result.target.result
          })
        )
        this.$emit('sureDialog')
      }
    },
    // 生成图片路径
    calculate_object_name1(thefile) {
      const suffix = this.get_suffix1(thefile.type, thefile.name)
      const name = this.policyData.dir + thefile.timestamp + '.' + suffix
      return name
    },
    get_suffix1(type, name) {
      const pos = type.lastIndexOf('/')
      let suffix = ''
      if (pos !== -1) {
        suffix = type.substring(pos + 1)
      }
      if (!type) {
        suffix = name.split('.')[1]
      }
      return suffix
    }
  }
}
</script>
<style lang="less" scoped>
.dialog-wrap {
  .head {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    margin-bottom: 20px;
    .symbol {
      flex-shrink: 0;
      margin-bottom: 0;
      margin-left: 4px;
      width: 14px;
      height: 14px;
      line-height: 14px;
      text-align: center;
      background: #ff9f0f;
      border-radius: 8px;
      color: #ffffff;
      border-radius: 50%;
      font-size: 12px;
      cursor: pointer;
      margin-right: 10px;
    }
  }
}
</style>
<style lang="less">
.audit-dialog-container {
  .el-dialog--center .el-dialog__body {
    padding: 20px;
  }
  .el-dialog__header {
    border-bottom: 1px solid rgba(233, 233, 233, 1);
    padding: 16px 0 10px 20px !important;
  }
  .el-dialog__footer {
    padding: 10px 20px 30px 0px !important;
    text-align: right;
  }
  .el-dialog__header {
    text-align: left;
  }
  .el-dialog__headerbtn {
    top: 17px !important;
    right: 20px !important;
    .el-icon-close {
      color: #333;
    }
  }
  .search-cut-wrapper {
    .btn-primary-plain,
    .btn-default {
      padding: 11px 21px;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      line-height: 14px;
      color: #202d40;
      border: 1px solid #dcdee0 !important;
      background: transparent !important;
    }
    .btn-primary {
      background-color: #2858f8 !important;
      color: #fff;
      border-color: #2858f8 !important;
    }
    .i-dialog-footer {
      margin-top: 30px;
      margin-bottom: 10px;
      display: none;
    }
  }
  .tailoring-content,
  .tailoring-box-parcel {
    /* 裁剪图片 */
    width: 480px;
    height: 260px;
    background: #f7f8fa;
    border: 2px dashed #dcdee0;
    border-radius: 4px;
  }
}
</style>
