<template>
  <div class="ipUpload">
    <el-upload
      v-show="!cropperUrl"
      class="upload-demo"
      :style="{ width: aspectRatio > 1.5 ? '360px' : aspectRatio > 1 ? '270px' : '202px' }"
      action="#"
      :ref="refName"
      :file-list="fileList"
      :accept="accept"
      :limit="limit"
      :maxSize="maxSize"
      :drag="drag"
      :multiple="multiple"
      :tipTitle="tipTitle"
      :show-file-list="false"
      :auto-upload="false"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :on-change="handleChange"
    >
      <i class=" el-icon-plus"></i>
      <div class="el-upload__text">{{ title }}--{{ aspectRatio }}</div>
      <div v-show="tipTitle" class="el-upload__text">{{ tipTitle }}</div>
    </el-upload>
    <div v-show="cropperUrl" class="upload-demo2" :style="{ width: aspectRatio > 1.5 ? '360px' : aspectRatio > 1 ? '270px' : '202px' }">
      <!-- <img v-if="cropperUrl" :src="cropperUrl" alt="" @click.stop="dialogVisible=true;fileUrlList=[cropperUrl]"> -->
      <img v-show="cropperUrl" :src="cropperUrl" alt="" @click.stop="editImg" />
      <div
        class="uploadfile-text"
        @click.stop="
          dialogVisible = true
          fileUrlList = [cropperUrl]
        "
      >
        查看切图
      </div>
      <!-- <div class="uploadfile-text" style="bottom:30px" @click.stop="clickUploadFile">重新上传</div> -->
      <input ref="uploadFile" style="display: none;" :accept="accept" type="file" @change="handleUploadFile" />
    </div>

    <cut-dialog
      ref="cutDialog"
      :show="cutDialog.visible"
      :aspectRatio="aspectRatio"
      @sureDialog="changeChoseDialog"
      @closeDialog="changeChoseDialog"
      @tailorImgUrl="tailorImgUrl"
      @clickUploadFile="clickUploadFile"
    ></cut-dialog>
    <!-- 图片预览 -->
    <el-image-viewer v-if="dialogVisible" :on-close="closeViewer" :url-list="fileUrlList" />
  </div>
</template>
<script>
import axios from 'axios'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import cutDialog from './cutDialog.vue'

export default {
  components: {
    ElImageViewer,
    cutDialog
  },
  props: {
    type: {
      // 上传类型
      type: String,
      default: ''
    },
    originalUrl: {
      // 图片未裁剪url
      type: String,
      default: ''
    },
    cropperUrl: {
      // 图片裁剪后url
      type: String,
      default: ''
    },
    accept: {
      // 文件格式
      type: String,
      default: '.bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp,.pdf'
    },
    limit: {
      // 上传文件最大个数
      type: [String, Number],
      default: 1
    },
    maxSize: {
      // 上传文件大小限制，单位m
      type: [String, Number],
      default: 10
    },
    drag: {
      // 是否启用拖拽上传
      type: Boolean,
      default: true
    },
    multiple: {
      // 是否支持多选文件
      type: Boolean,
      default: false
    },
    minWidth: {
      // 图片最小的宽度
      type: [Number, String],
      default: 0
    },
    minHeight: {
      // 图片最小的高度
      type: [Number, String],
      default: 0
    },
    title: {
      // 上传
      type: String,
      default: '上传'
    },
    tipTitle: {
      // 上传比例提示
      type: String,
      default: ''
    },
    refName: {
      // ref
      type: String,
      default: () => 'upload'
    },
    aspectRatio: {
      // 截图比例
      type: Number,
      default: 1 / 1
    },
    isCropper: {
      // 是否支持裁剪
      type: Boolean,
      default: true
    },
    policyData: {
      type: Object,
      default() {
        return {
          host: '',
          accessId: '',
          policy: '',
          signAture: '',
          dir: ''
        }
      }
    }
  },
  data() {
    return {
      fileList: [],
      cutDialog: {
        visible: false,
        url: ''
      },
      dialogVisible: false,
      fileUrlList: [], // 文件路径列表
      oldUrl: ''
    }
  },
  mounted() {
    // !this.isCropper && this.GenPostPolicy()
  },
  methods: {
    changeChoseDialog() {
      this.cutDialog.visible = false
    },

    // 获取阿里云直传的配置参数
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
    // 上传 超出文件个数限制的回调
    handleExceed(files, fileList) {
      console.log(this.limit, 'this.limit', fileList)
      this.$message.warning('最多只能上传' + this.limit + '张图片')
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUpload(file) {
      console.log(file, 'file')
      let flag = true
      // 读取图片数据
      console.log(file.name)
      const fileName = file.name.substring(file.name.lastIndexOf('.'))
      if (!this.accept.includes(fileName)) {
        flag = false
        this.$message.warning('格式限制：jpg,jpeg,png,webp,bmp,gif,RGB')
      }
      if (file.size / 1024 / 1024 > 10) {
        flag = false
        this.$message.warning(`上传图片需小于${this.maxSize}M`)
      }

      return new Promise((resolve, reject) => {
        if (flag) {
          // resolve(true);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(false)
        }
      })
    },
    // 1、（第一次上传）文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      console.log('fasfsafs', file, fileList)
      this.fileList = []
      this.changeFile(file.raw)
    },
    // 2、选择图
    clickUploadFile() {
      this.$refs.uploadFile.click()
    },
    // 2-1、重新上传--选择文件
    handleUploadFile() {
      // 回调上传文件
      const file = this.$refs.uploadFile.files[0]
      console.log(3333333)
      this.changeFile(file)
    },
    changeFile(file) {
      const fileName = file.name.substring(file.name.lastIndexOf('.'))
      if (!this.accept.includes(fileName.toLowerCase())) return this.$message.warning(`格式限制：${this.accept.split(',').join('/')}`)
      if (file.size / 1024 / 1024 > this.maxSize) return this.$message.warning(`上传图片需小于${this.maxSize}M`)
      // 走裁剪
      // if (this.isCropper) {
      // 使用h5的读取文件api(file文件转bese64)
      var reader = new FileReader()
      const image = new Image()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // jq裁剪
        image.src = reader.result
        image.onload = () => {
          if (image.width >= this.minWidth && image.height >= this.minHeight) {
            if (this.isCropper) {
              this.cutDialog.visible = true
              this.$nextTick(() => {
                this.$refs.cutDialog.init(reader.result, file)
              })
            }
            this.originalImg(file)
          } else {
            this.$message.warning(`请上传尺寸大于${this.minWidth}*${this.minHeight}的图片`)
          }
        }
      }
      // }
    },
    originalImg(file) {
      // 不走裁剪(存原图路径)
      const nfile = file
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
          this.oldUrl = 'http://tu.chdesign.cn/' + this.calculate_object_name1(nfile)
          // 不裁剪，原图和裁剪图一样
          if (!this.isCropper) {
            this.$emit('getUrl', {
              type: this.type,
              originalUrl: 'http://tu.chdesign.cn/' + this.calculate_object_name1(nfile),
              cropperUrl: 'http://tu.chdesign.cn/' + this.calculate_object_name1(nfile)
            })
          }
        }
      })
    },

    // 编辑
    editImg() {
      if (this.isCropper) {
        this.cutDialog.visible = true
        this.$nextTick(() => {
          this.$refs.cutDialog.init(this.originalUrl, {})
        })
      } else {
        this.clickUploadFile()
      }
    },
    // 获取裁剪后的imgurl
    tailorImgUrl(url) {
      console.log(1111111113, url)
      this.$emit('getUrl', {
        type: this.type,
        originalUrl: this.oldUrl,
        cropperUrl: url
      })
    },

    calculate_object_name1(thefile) {
      const suffix = this.get_suffix(thefile.type, thefile.name)
      const name = this.policyData.dir + thefile.timestamp + '.' + suffix
      return name
    },
    get_suffix(type, name) {
      const pos = type.lastIndexOf('/')
      let suffix = ''
      if (pos !== -1) {
        suffix = type.substring(pos + 1)
      }
      if (!type) {
        suffix = name.split('.')[1]
      }
      return suffix
    },
    closeViewer() {
      // 关闭预览
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less">
.ipUpload {
  float: left;
  margin-right: 40px;
  .upload-demo2 {
    position: relative;
    height: 202px;
    &:hover {
      .uploadfile-text {
        display: block;
      }
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      box-sizing: border-box;
      border: 1px dashed #d9d9d9;
      object-fit: 'cover';
      cursor: pointer;
    }
    .uploadfile-text {
      display: none;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 32px;
      background-color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
      line-height: 32px;
      text-align: center;
      color: #fff;
      cursor: pointer;
    }
  }
  .upload-demo {
    height: 202px;
  }
  .el-upload,
  .el-upload-dragger {
    width: 100%;
    height: 202px;
  }

  .upload-demo {
    .el-icon-plus {
      margin-top: 60px;
      color: #d9d9d9;
      font-size: 20px;
    }
    .el-upload__text {
      color: #d9d9d9;
      margin-top: 8px;
      font-size: 14px;
    }
  }
}
</style>
