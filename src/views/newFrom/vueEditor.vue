<template>
  <div class="editor">
    <div class="plugins-tips">
      Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。 访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank"
        >vue-quill-editor</a
      >
    </div>
    {{ content }}
    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
    <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    <p>gsgdsgs</p>
    <p>hjklsdhg</p>
    <ul>
      <li>rewtewtew</li>
      <li>twetew</li>
    </ul>
    <ol>
      <li>twetewtew</li>
      <li>ewtywete</li>
      <li><s>sdsdsdsds</s></li>
      <li><strong>sadadada</strong></li>
    </ol>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
  [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: '-1' }, { indent: '+1' }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{ direction: 'rtl' }], // 文本方向-----[{'direction': 'rtl'}]
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ font: [] }], // 字体种类-----[{ font: [] }]
  [{ align: [] }], // 对齐方式-----[{ align: [] }]
  ['clean'], // 清除文本格式-----['clean']
  ['image'], // 链接、图片、视频-----['link', 'image', 'video']
]

export default {
  name: 'editor',
  data() {
    return {
      content: '<div style="color: rgb(230, 0, 0);">1111</div>',
      editorOption: {
        placeholder: 'Hello World',
        modules: {
          toolbar: {
            container: toolbarOptions,
          },
        },
      },
    }
  },
  components: {
    quillEditor,
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html
    },
    submit() {
      console.log(this.content)
      this.$message.success('提交成功！')
    },
  },
}
</script>
<style lang="less" scoped>
.plugins-tips {
  background: #eef1f6;
  padding: 20px 10px;
  margin-bottom: 20px;
}
.editor-btn {
  margin-top: 20px;
}
</style>
<style lang="less">
.editor {
  .ql-container {
    height: 300px;
  }
}
</style>
