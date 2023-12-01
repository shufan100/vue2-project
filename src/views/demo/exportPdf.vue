<template>
  <div id="exportPdf">
    <el-button @click="getPdf('名称ssss')">导出PDF</el-button>
    <el-button @click="exportPic()">下载图片</el-button>

    <div class="row" id="canvasPic">
      <div style="margin-bottom: 20px">给自己需要导出的ui部分.定义id为"pdfDom".此部分将就是pdf显示的部分</div>
      <img src="../../assets/images/02.jpg" alt="" />
      <table>
        <tbody>
          <tr>
            <td>
              <label for="name">企业名称：</label>
            </td>
            <td colspan="7">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="name" style="border-width: 0px; width: 100%; padding: 0px">
                许昌许继低压电器有限公司
              </span>
            </td>
          </tr>
          <tr>
            <td rowspan="4">
              <label for="pccc">资质等级：</label>
            </td>
            <td colspan="3">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="pccc" style="border-width: 0px; width: 100%; padding: 0px">
                <span class="mini-textbox-border mini-corner-all">
                  <input
                    type="text"
                    class="mini-textbox-input"
                    autocomplete="off"
                    placeholder="主项：电力承包总资质："
                    id="pccc$text"
                    name="pccc"
                    readonly=""
                  />
                </span>
                <input type="hidden" />
              </span>
            </td>
            <td colspan="4">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="gender" style="border-width: 0px">
                <span class="mini-textbox-border mini-corner-all">
                  <input type="text" class="mini-textbox-input" autocomplete="off" placeholder="增项（3）" id="gender$text" name="gender" readonly="" />
                </span>
                <input type="hidden" />
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="realName" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input
                    type="text"
                    class="mini-textbox-input"
                    autocomplete="off"
                    placeholder="增项（1）"
                    id="realName$text"
                    name="realName"
                    readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
            <td colspan="4">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="gender1" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input
                    type="text"
                    class="mini-textbox-input"
                    autocomplete="off"
                    placeholder="增项（4）"
                    id="gender1$text"
                    name="gender1"
                    readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="realName1" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input
                    type="text"
                    class="mini-textbox-input"
                    autocomplete="off"
                    placeholder="增项（2）"
                    id="realName1$text"
                    name="realName1"
                    readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
            <td colspan="4">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="gender2" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input
                    type="text"
                    class="mini-textbox-input"
                    autocomplete="off"
                    placeholder="增项（5）"
                    id="gender2$text"
                    name="gender2"
                    readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
          </tr>

          <tr>
            <td>
              <label for="acc">承装资质：</label>
            </td>
            <td>
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="acc" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="acc$text" name="acc" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>

            <td>
              <label for="rcc">承修资质：</label>
            </td>
            <td>
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="rcc" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="rcc$text" name="rcc" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
            <td>
              <label for="tcc">承试资质：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="tcc" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="tcc$text" name="tcc" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
          </tr>

          <tr>
            <td>
              <label for="cuscc">统一社会信用代码：</label>
            </td>
            <td colspan="7">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="cuscc" style="border-width: 0px; width: 100%; padding: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="cuscc$text" name="cuscc" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label for="pcccn">电力总承包资质证书编号：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="pcccn" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="pcccn$text" name="pcccn" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
            <td colspan="2">
              <label for="pccced">电力总承包资质有效期：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="pccced" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="pccced$text" name="pccced" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label for="pscn">安全许可证编号：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="pscn" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="pscn$text" name="pscn" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>

            <td colspan="2">
              <label for="psced">安全许可证有效期：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="psced" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="psced$text" name="psced" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label for="permissionNo">电力许可证编号：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="permissionNo" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input
                    type="text"
                    class="mini-textbox-input"
                    autocomplete="off"
                    placeholder=""
                    id="permissionNo$text"
                    name="permissionNo"
                    readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>

            <td colspan="2">
              <label for="ced">电力资质有效期：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="ced" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="ced$text" name="ced" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label for="bln">营业执照号：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="bln" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="bln$text" name="bln" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>

            <td colspan="2">
              <label for="bled">营业执照有效期：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="bled" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="bled$text" name="bled" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label for="address">地址：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="address" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="address$text" name="address" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>

            <td colspan="2">
              <label for="postCode">邮编：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="postCode" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="postCode$text" name="postCode" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label for="businessEntity">企业法人姓名：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="businessEntity" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input
                    type="text"
                    class="mini-textbox-input"
                    autocomplete="off"
                    placeholder=""
                    id="businessEntity$text"
                    name="businessEntity"
                    readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>

            <td colspan="2">
              <label for="businessEntityId">企业法人身份证号：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="businessEntityId" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input
                    type="text"
                    class="mini-textbox-input"
                    autocomplete="off"
                    placeholder=""
                    id="businessEntityId$text"
                    name="businessEntityId"
                    readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label for="city">公司注册地：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="city" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="city$text" name="city" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>

            <td colspan="2">
              <label for="createTime">建档时间：</label>
            </td>
            <td colspan="2">
              <span class="mini-textbox asLabel mini-textbox-readOnly mini-required" id="createTime" style="border-width: 0px"
                ><span class="mini-textbox-border mini-corner-all"
                  ><input type="text" class="mini-textbox-input" autocomplete="off" placeholder="" id="createTime$text" name="createTime" readonly="" /></span
                ><input type="hidden"
              /></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
  data() {
    return {
      htmlTitle: 'PDF文件名',
    }
  },
  mounted() {
    // this.exportPic()
  },
  methods: {
    // 方法
    exportPic() {
      const self = this
      // $event.preventDefault()
      const canvas2 = document.createElement('canvas')
      const _canvas = document.getElementById('canvasPic')
      const w = parseInt(window.getComputedStyle(_canvas).width)
      const h = parseInt(window.getComputedStyle(_canvas).height)
      // 放大canvas画布，然后放在较小的容器内，像素会升高
      canvas2.width = w * 2
      canvas2.height = h * 2
      canvas2.style.width = w + 'px'
      canvas2.style.height = h + 'px'

      const context = canvas2.getContext('2d')
      context.scale(2, 2)
      html2canvas(document.getElementById('canvasPic'), {
        canvas: canvas2,
      }).then(function (canvas) {
        const fileName = '图片名字' + '.jpg'
        const imgUri = canvas.toDataURL('image/jpeg', 2) // 获取生成的图片的url
        // console.log(imgUri)
        // 下载方法
        self.fileDown(imgUri, fileName)
      })
    },
    fileDown(url, name) {
      // console.log(url, name)
      const self = this
      const fileName = name
      self
        .$axios({
          method: 'post',
          url: url,
          responseType: 'blob',
        })
        .then(data => {
          const blob = new Blob([data.data], { type: 'application/json' })
          if (window.navigator.msSaveOrOpenBlob) {
            // msSaveOrOpenBlob方法返回bool值
            navigator.msSaveBlob(blob) // 本地保存
          } else {
            const link = document.createElement('a') // a标签下载
            link.href = window.URL.createObjectURL(blob)
            link.download = fileName
            link.click()
            window.URL.revokeObjectURL(link.href)
          }
        })
    },
    // 根据地址下载图片
    // 下载图片（无需接口）
    downloadImg(item) {
      let name = this.getFileName(item.originUrl)
      let res = new XMLHttpRequest()
      res.open('GET', item.originUrl, true) // 异步请求
      res.responseType = 'blob'
      res.onload = function (e) {
        let blob = new Blob([res.response])
        let a = document.createElement('a') // 页面上创建一个标签
        a.setAttribute('href', URL.createObjectURL(blob)) // 设置a 标签的href，
        a.setAttribute('download', name) // 设置a 标签的download 属性，并限定下载文件名。
        a.click() // 出发a点击事件，下载文件
      }
      res.send()
    },
  },
}
</script>
<style lang="less">
#exportPdf {
  #pdfDom {
    padding-top: 20px;
    background-color: #fff;
    text-align: center;
  }
  tbody tr {
    width: 100%;
    height: 24px;
    border-right: 1px solid #b2c4c0 !important;
  }
  tbody tr td {
    border-left: 1px solid #b2c4c0;
    border-bottom: 1px solid #b2c4c0;
    text-align: left;
    padding-left: 12px;
    background-color: #fffff5;
  }
  .mini-textbox {
    width: 150px;
    height: 24px;
    display: inline-block;
    padding: 0;
    margin: 0;
    border: 0;
    vertical-align: middle;
    overflow: hidden;
    position: relative;
  }
}
</style>
