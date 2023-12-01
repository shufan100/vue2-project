<template>
  <div style="padding: 30px">
    <!-- :api-key="apiKey" -->
    <editor :init="editConfig" v-model="content" />
    {{ content }}
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
export default {
  components: { editor: Editor },
  data() {
    return {
      content: '<p>1111</p><div style="float:right;color:red">{{ content }}</div>',
      apiKey: 'fmpe10wgtn5cy4tq0quwhxd21a2mb6z7pwuf0zsut09xk039', //key值从官网注册申请来的
      editConfig: {
        // inlineEditor: false,
        height: 500, //富文本高度
        menubar: true, // 去最上方栏目
        branding: false, // 去水印
        elementpath: false, //禁用编辑器底部的状态栏
        statusbar: false, // 隐藏编辑器底部的状态栏
        toolbar:
          'fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen', // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
        font_formats:
          '微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times', //字体
        // theme: 'silver', //主题
        language_url: '/tinymce/zh_CN.js', //中文包
        language: 'zh_CN', //中文
        browser_spellcheck: true, // 拼写检查

        paste_data_images: true, // 是否允许粘贴图像
        menufontsize_formats: '14px 16px 18px 20px 24px 26px 28px 30px 32px 36px', //字体大小
        file_picker_types: 'image',
        images_upload_credentials: false,

        // // 添加扩展插件
        external_plugins: {
          powerpaste: '/tinymce/plugins/powerpaste/plugin.min.js',
        },
        powerpaste_allow_local_images: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount powerpaste',
        ],
        images_upload_handler: function (blobInfo, success, failure) {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
          // let formdata = new FormData()
          // formdata.append('file', blobInfo.blob()) // 上传图片接口，跟后端同事协调上传图片// http://hh.xxxx.cn/admin/upload为上传图片接口
          // axios.post('http://hh.xxxx.cn/admin/upload',formdata).then(function(res) {//拿到上传成功的路径 在前端显示success(res.data.data.src);}).catch(res => {failure("error");});}}
        },
      },
    }
  },
  methods: {},
}
</script>
