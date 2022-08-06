<template>
  <!-- 原生上传 -->
  <div>
    <!-- 多选展示 -->
    <template v-if="fileList.length">
      <div v-for="(item, index) in fileList" :key="item.preview" class="avatar-uploader-li" :style="{ width, height }">
        <img :src="item.preview" />
        <i class="el-icon-error" @click="fileList.splice(index, 1)"></i>
      </div>
    </template>
    <div class="upload2" :style="{ width, height }" @click="openFile" @drop.prevent.stop="getDropFile" @dragover.prevent.stop="">
      <slot></slot>
    </div>
    <input ref="upload" :accept="accept" :multiple="multiple" type="file" @change="changeFile" hidden style="display: none;" />
  </div>
</template>

<script>
export default {
  props: {
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
      fileTotal: 0
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
      if (files.length) {
        if (this.multiple) {
          this.fileListFilter(files)
        } else {
          this.fileFilter(files)
        }
      }
    },

    // 单张过滤
    async fileFilter(data) {
      console.log(data, '===')
      const file = data[0]
      // 校验大小
      if (file.size > 20 * 1024 * 1024 * 1024) return this.$message.warning('限制20M图片')
      // 校验格式
      if (!this.accept.includes(file.type.split('/')[1])) return this.$message.warning(`格式限制：${this.accept}`)
      // 校验尺寸
      const url = URL.createObjectURL(file)
      const { w, h } = await this.getImgWH(url)
      if (w >= this.imgW && h >= this.imgH) {
        this.fileDispose(file)
      } else {
        this.$message.warning(`请上传尺寸大于${this.imgW}*${this.imgH}的图片`)
      }
    },
    // 多张过滤
    async fileListFilter(files) {
      if (files.length >= 20) return this.$message.warning('单次上传图片不能大于20张')

      let hint = false
      for (var i = 0; i < files.length; i++) {
        // 校验多张图片大小
        if (files[i].size > 20 * 1024 * 1024 * 1024) {
          hint = true
          continue
        }
        if (!this.accept.includes(files[i].type.split('/')[1])) {
          hint = true
          continue
        }
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
    async fileDispose(file) {
      const url = URL.createObjectURL(file)
      const data = await this.getImgWH(url)
      this.fileList.push({
        file: file,
        progress: 0,
        preview: URL.createObjectURL(file),
        status: 0, // 0 还未上传 1 上传中 2 上传成功 3 上传失败
        title: file.name,
        patternUrl: '',
        width: data.w,
        height: data.h
      })
      this.fileTotal = this.fileList.length
      console.log(this.fileList)
    },
    // 获取图片分辨率大小
    getImgWH(imgUrl) {
      return new Promise(resolve => {
        const image = new Image()
        image.src = imgUrl
        image.onload = function() {
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
  display: flex;
  justify-content: center;
  align-items: center;
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
