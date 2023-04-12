<template>
  <div class="editor">
    <div class="plugins-tips">
      Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。 访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
    </div>
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
export default {
  name: 'editor',
  data () {
    return {
      content: '',
      editorOption: {
        placeholder: 'Hello World'
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    onEditorChange ({ editor, html, text }) {
      this.content = html
    },
    submit () {
      console.log(this.content)
      this.$message.success('提交成功！')
    }
  }
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
