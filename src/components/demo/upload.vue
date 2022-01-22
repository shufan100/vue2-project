<template>
  <div>
    <div class="container">

      <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-change='handleChange'>
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
              <i class="el-icon-download"></i>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

      <!-- 999999999999 -->
      <div class="content-title">支持裁剪</div>
      <div class="plugins-tips">
        vue-cropperjs：一个封装了 cropperjs 的 Vue 组件。
        访问地址：<a href="https://github.com/Agontuk/vue-cropperjs" target="_blank">vue-cropperjs</a>
      </div>
      <div class="crop-demo">
        <img :src="cropImg" class="pre-img">
        <div class="crop-demo-btn">选择图片
          <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" />
        </div>
      </div>

      <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
        <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelCrop">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- <el-button @click="exports">下载/xls/pdf/png</el-button>  -->
  </div>
</template>

<script>
import axios from 'axios'
import VueCropper from 'vue-cropperjs'
export default {
  name: 'upload',
  data: function () {
    return {
      defaultSrc: require('../../assets/images/img.jpg'),
      fileList: [],
      imgSrc: '',
      cropImg: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  components: {
    VueCropper
  },
  created () {
    this.cropImg = this.defaultSrc
  },
  methods: {
    setImage (e) {
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
    cropImage () {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    cancelCrop () {
      this.dialogVisible = false
      this.cropImg = this.defaultSrc
    },
    imageuploaded (res) {
      console.log(res)
    },
    handleError () {
      this.$notify.error({
        title: '上传失败',
        message: '图片上传接口上传失败，可更改为自己的服务器接口'
      })
    },
    handleChange (file) {
      sessionStorage.setItem('file', JSON.stringify(file))
      this.$router.push('/magnifying')
    },
    handleRemove (file) {
      console.log(file)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    },

    // 确定
    confirm () {
      this.dialogVisible = false
      console.log(this.imgSrc, 'imgSrc')
    },
    // 下载文件
    async exports () {
      const data = {
        cityId: this.formInline.cityId,
        countyId: this.formInline.countyId,
        currPage: this.page.pageCurr,
        pageSize: this.page.pageSize,
        iscId: this.loginInfo.iscId
      }
      this.downloadModule(data, 'quality/exportStageProgressCompare')
    },
    async downloadModule (data, url) {
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
