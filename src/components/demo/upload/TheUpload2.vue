<!-- **原生上传** -->
<template>
  <div>
    <!-- 多选展示 -->
    <template v-if="origListUrl.length">
      <div v-for="(item, index) in origListUrl" :key="item.base64Url" class="avatar-uploader-li" :style="{ width, height }">
        <img :src="item.base64Url" />
        <i class="el-icon-error" @click="origListUrl.splice(index, 1)"></i>
      </div>
    </template>
    <div class="upload2" :style="{ width, height }" @click="openFile" @drop.prevent.stop="getDropFile" @dragover.prevent.stop="">
      <img v-if="origUrl" :src="origUrl" />
      <slot v-else></slot>
    </div>

    <!-- 原生调用上传方法 -->
    <input ref="upload" :accept="accept" :multiple="multiple" type="file" @change="changeFile" hidden style="display: none" />
  </div>
</template>

<script>
import { uploadOSS } from '@/utils/oss/ossUpload.js'
export default {
  props: {
    origUrl: String,
    origListUrl: {
      type: Array,
      default: () => []
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
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
    }
  },
  data() {
    return {
      fileList: [],
      arr: []
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 点击调用原生选择图片弹窗
    openFile() {
      console.log(this.$refs.upload)
      this.$refs.upload.click()
    },
    // 点击上传触发
    changeFile(e) {
      this.verify(e.target.files)
    },
    // 拖拽上传触发
    getDropFile(e) {
      this.verify(e.dataTransfer.files)
    },
    verify(files) {
      if (!files.length) return false
      this.multiple ? this.fileListFilter(files) : this.fileFilter(files)
    },

    // 单张过滤
    async fileFilter(data) {
      const file = data[0]
      // 校验大小
      if (file.size > 20 * 1024 * 1024 * 1024) return this.$message.warning('限制20M图片')
      // 校验格式
      if (!this.accept.includes(file.type.split('/')[1])) return this.$message.warning(`格式限制：${this.accept}`)
      // 校验尺寸
      const url = URL.createObjectURL(file) // 图片base64地址
      const { w, h } = await this.getImgWH(url) // 图片宽高
      if (w < this.imgW && h < this.imgH) return this.$message.warning(`请上传尺寸大于${this.imgW}*${this.imgH}的图片`)
      // 上传oss
      const datas = await uploadOSS(file)
      this.$emit('update:origUrl', datas.url)
    },
    // 多张过滤
    async fileListFilter(files) {
      if (files.length >= 20) return this.$message.warning('单次上传图片不能大于20张')

      let hint = false
      for (var i = 0; i < files.length; i++) {
        // 校验图片大小
        if (files[i].size > 20 * 1024 * 1024 * 1024) {
          hint = true
          continue
        }
        // 检验类型
        if (!this.accept.includes(files[i].type.split('/')[1])) {
          hint = true
          continue
        }
        // 校验尺寸
        const url = URL.createObjectURL(files[i])
        const { w, h } = await this.getImgWH(url)
        if (w >= this.imgW && h >= this.imgH) {
          this.fileDispose(files[i])
        } else {
          hint = true
        }
      }
      if (hint) {
        this.$message.warning('已过滤非图片类型文件或单张大于20M的图片')
      }
    },

    // 上传oss
    async fileDispose(file) {
      // const url = URL.createObjectURL(file)
      // const data = await this.getImgWH(url)
      this.fileList.push({
        name: file.name,
        base64Url: URL.createObjectURL(file)
        // ossUrl: uploadOSS(file)
        // width: data.w,
        // height: data.h
      })
      this.$emit('update:origListUrl', this.fileList)

      uploadOSS(file).then(res => {
        console.log(res, '==')
        this.arr.push(res)
        console.log(this.arr)
      })
    },
    // 获取图片分辨率大小
    getImgWH(imgUrl) {
      return new Promise(resolve => {
        const image = new Image()
        image.src = imgUrl
        image.onload = function () {
          const w = image.width
          const h = image.height
          resolve({ w, h })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.upload2 {
  // float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  div {
    text-align: center;
    cursor: pointer;
    i {
      font-size: 28px;
      color: #8c939d;
      font-weight: bolder;
    }
    p {
      color: #999;
      font-size: 14px;
    }
  }
  &:hover {
    border-color: #409eff;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.avatar-uploader-li {
  position: relative;
  float: left;
  margin-right: 20px;
  margin-bottom: 20px;
  &:hover {
    .el-icon-error {
      display: block;
    }
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
  .el-icon-error {
    display: none;
    position: absolute;
    top: -4px;
    right: -8px;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
}
</style>
