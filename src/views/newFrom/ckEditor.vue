<template>
  <div class="TheCkeditor" :style="{ height: containerMinH + 'px' }">
    <ckeditor
      class="ckeditor"
      ref="refCKEditor"
      :config="config"
      v-model="html"
      :read-only="readOnly"
      :throttle="120"
      :editor-url="editorUrl"
      @namespaceloaded="onNamespaceLoaded"
    ></ckeditor>
    <!--  -->
  </div>
</template>

<script>
import CKEditor from 'ckeditor4-vue'

export default {
  name: 'ckEditor',
  components: {
    ckeditor: CKEditor.component,
  },
  props: {
    //内容
    content: {
      type: String,
      default: '',
    },
    containerMinH: {
      type: Number,
      default: 420,
    },
    editorH: {
      type: Number,
      default: 380,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    isImage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      editorUrl: '/ckeditor/ckeditor.js', //将指令的值更改为指向所需的 CKEditor 4 脚本位置来更改
      html: '',
      oldHtml: '',
      config: {
        editorplaceholder: '请输入内容...',
        height: this.editorH,
        // 工具栏
        toolbarGroups: [
          { name: 'styles', groups: ['styles', 'font'] }, // 主题、字体大小...
          { name: 'basicstyles', groups: ['basicstyles'] }, //加粗...
          { name: 'colors', groups: ['colors'] }, // 颜色...
          { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] }, // 序号，对齐...
          { name: 'links', groups: ['links'] }, //链接
          { name: 'insert', groups: ['insert'] }, // 图片、表格...
          { name: 'cleanup', groups: ['cleanup'] }, // 格式刷...
          { name: 'clipboard', groups: ['clipboard', 'undo'] }, //前进后退
          // { name: 'document', groups: ['mode', 'document', 'doctools'] },
          // { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'], },
          // { name: 'forms', groups: ['forms'] },
          // { name: 'tools', groups: ['tools'] },
          // { name: 'others', groups: ['others'] },
        ],
        //   // toolbar 中的一些配置功能 需要在这里添加一下才可以用 例如 print colorbutton
        extraPlugins: 'divarea',
        // extraPlugins: 'font,print,format,colorbutton,justify,uploadimage,notification',
        resize_enabled: false, // 取消拖拽改变尺寸功能
        fonSize_sizes: '16/16px', //设置默认字体大小
        // 删除链接弹窗的目标和高级tab;删除表格的高级
        removeDialogTabs: 'link:target;link:advanced;table:advanced;',
        // 删除的工具栏
        removeButtons: [
          'Source',
          'Save',
          'NewPage',
          'ExportPdf',
          'Preview',
          'Print',
          'Templates',
          'PasteFromWord',
          'PasteText',
          'Paste',
          'Cut',
          'Copy',
          'Find',
          'Replace',
          'SelectAll',
          'Scayt',
          'Form',
          'Checkbox',
          'TextField',
          'Textarea',
          'Select',
          'Button',
          'ImageButton',
          'HiddenField',
          'Radio',
          'Blockquote',
          'CreateDiv',
          'Language',
          // 'Link',
          'Unlink',
          'Anchor',
          'HorizontalRule',
          'Smiley',
          'SpecialChar',
          'PageBreak',
          'Iframe',
          'ShowBlocks',
          'About',
          // 'Undo',
          // 'Redo',
          'Indent',
          'Outdent',
          'BidiLtr',
          'BidiRtl',
          'Maximize',
          'ComBo',
        ],
      },
    }
  },
  watch: {
    content(newVal) {
      // console.log(newVal,'newVal')
      // this.config.editorplaceholder = newVal ? '' : '请输入内容...'
      this.html = newVal
      this.html = this.html.replaceAll(/img_url/g, 'src')

      // 回显img
      // setTimeout(() => {
      //   this.$nextTick(() => {
      //     let imgs = document.querySelector('.ckeditor')?.querySelectorAll('img')
      //     if (imgs && imgs.length) {
      //       for (let i = 0; i < imgs.length; i++) {
      //         let url = imgs[i].getAttribute('src')
      //         if (url && url.indexOf('http') > -1) {
      //           this.m_apiFn(emailFileDownload)({
      //             url,
      //             loggerParams: {
      //               auditType: 'not',
      //             },
      //           }).then(res => {
      //             const reader = new FileReader()
      //             reader.readAsDataURL(res)
      //             reader.onload = e => {
      //               imgs[i].setAttribute('src', e.target.result)
      //               let str = url.replaceAll(/&/g, '&amp;')
      //               let arr = this.html.split(str)
      //               this.html = arr[0] + e.target.result + arr[1]
      //               // console.log(this.html,'==-')
      //             }
      //           })
      //         }
      //       }
      //     }
      //   })
      // }, 500)
    },
  },
  methods: {
    onNamespaceLoaded(CKEDITOR) {
      console.log('CKEDITOR', CKEDITOR)
    },
  },
}
</script>
<style lang="less" scoped>
.TheCkeditor {
  // min-height:420px;
  .ckeditor {
    a {
      padding: 4px 6px !important;
    }
    /deep/ ol {
      list-style: auto !important;
    }
    /deep/ ul {
      display: block;
      list-style: disc !important;
      list-style-type: disc;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
    }

    /deep/ textarea {
      display: none;
    }
    /deep/ .cke_editable img {
      max-width: 100%;
    }
    /deep/ .cke_chrome {
      border: 0;
    }
    /deep/ .cke_top {
      // border-bottom:0;
      padding: 6px 8px 2px !important;
      background: #fff;
    }
    /deep/ .cke_bottom {
      display: none;
    }
    /deep/ .cke_combo__styles {
      display: none;
    }
    /deep/ .cke_button__image {
      display: none;
    }
    /deep/ pre > code {
      overflow-x: scroll;
      background-color: #f5f2f0;
      border: 1px solid #e8e8e8;
      border-radius: 4px 4px;
      display: block;
      font-size: 14px;
      padding: 14px;
      color: #333;
      margin: 7px 0;
      font-family: 'Microsoft Yahei', sans-serif;
      line-height: 1.6;
      white-space: pre-wrap;
    }
    /deep/ .cke_toolgroup {
      margin: 1px 2px 6px 0 !important;
      padding-right: 3px !important;
    }
    /deep/ .cke_wysiwyg_div > span {
      display: none;
    }
  }
}
</style>
