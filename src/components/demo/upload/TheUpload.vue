<template>
  <!-- element-ui上传 -->
  <div id="uploads">
    <!-- 多选展示 -->
    <template v-if="imageUrlList.length">
      <div v-for="i in imageUrlList" :key="i" class="avatar-uploader-li" :style="{ width, height }">
        <img :src="i" />
      </div>
    </template>
    <!-- 单选展示 -->
    <el-upload
      class="avatar-uploader"
      :style="{ width, height }"
      action="#"
      :multiple="multiple"
      :show-file-list="false"
      :drag="true"
      :accept="accept"
      :http-request="httpRequest"
    >
      <div class="avatar-uploader-tip">
        <img v-if="imageUrl" :src="imageUrl" class="avatar-uploader-img" />
        <slot v-else></slot>
      </div>
    </el-upload>
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
      imageUrl: '',
      imageUrlList: []
    }
  },
  created() {},
  mounted() {},
  methods: {
    //
    // onChage(file, fileList) {
    //   console.log(111)
    //   // console.log(fileList)
    //   if (fileList.length >= 50) {
    //     this.$message.warning('单次上传图片不能大于20张')
    //     return false
    //   }
    // },
    // 上传自定义回调
    httpRequest(option) {
      console.log(option)
      // 单选先置空
      if (!this.multiple) {
        this.imageUrlList = []
      }
      // 符合格式
      if (this.accept.includes(option.file.type.split('/')[1])) {
        console.log(1111)
        const reader = new FileReader() // file转bese64
        const image = new Image()

        reader.readAsDataURL(option.file)
        reader.onload = () => {
          image.src = reader.result
          image.onload = () => {
            // console.log('上传的图片尺寸：', image.width, image.height)
            if (this.multiple) {
              this.imageUrlList.push(reader.result)
              this.$emit('getUrlList', this.imageUrlList)
            } else {
              this.imageUrl = reader.result
            }
          }
        }
      } else {
        this.$message.error('已过滤非图片类型文件或单张大于20M的图片')
      }
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
  // 多张样式

  .avatar-uploader-li {
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
