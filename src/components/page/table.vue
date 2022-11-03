<template>
  <div id="tables">
    <transition name="fade">
      <div v-if="show">
        <!-- 表单搜索 -->
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item>
            <el-input size="small" v-model="formData.searchVal" placeholder="请输入ID" @input="changCode"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="Inquire">查询</el-button>
            <el-button type="primary" size="small" @click="export2Excel">数据导出xls</el-button>
            <el-button type="primary" size="small" @click="exportExcel">文件流导出xls</el-button>
            <el-button type="primary" size="small" @click="setPrint">打印二维码</el-button>
          </el-form-item>
        </el-form>
        <!-- 表单 -->
        <el-table
          ref="multipleTable"
          :data="tableData.length > 20 ? tableData.slice(page.pageSize * (page.pageNum - 1), page.pageSize * page.pageNum) : tableData"
          border
          stripe
          height="630"
          style="width: 100%"
          v-loading="loading"
          @select="handleSelectionChange"
          @select-all="handleSelectionAll"
        >
          <!-- type:selection选择，index索引，expand可展示 -->
          <!-- :reserve-selection="true"不清除选中状态 -->
          <el-table-column type="selection" width="50" :reserve-selection="true" :selectable="selectable" disabled="false"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">
              <span>{{ scope.$index + (page.pageNum - 1) * page.pageSize + 1 }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column type="index" width="120" label="ID" :show-overflow-tooltip="true"></el-table-column> -->
          <!-- <el-table-column type="id" label="ID" width="120" :show-overflow-tooltip="true"></el-table-column> -->
          <el-table-column prop="date" label="日期" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="name" label="姓名" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="头像(查看大图)" align="center">
            <template slot-scope="scope">
              <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="地址" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button type="text" class="iconfont iconchakan" style="color: #409eff !important" @click="showViewer = true">查看更多图片</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.pageTotal"
        ></el-pagination>
      </div>
    </transition>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="oldForm" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="oldForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="oldForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 二维码 -->
    <div ref="prints">
      <VueQr v-for="(item, index) of multipleSelection" :key="index" :row-key="index" :text="item.code" :size="400"></VueQr>
    </div>
    <!-- 查看更多图片 -->
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="srcList"></el-image-viewer>
  </div>
</template>
<script>
import VueQr from 'vue-qr'
export default {
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 20,
        pageTotal: 0
      },
      tableData: [
        {
          date: '2020-05-02',
          name: '张三',
          thumb: 'https://lin-xin.gitee.io/images/post/wms.png',
          address: '上海市普陀区金沙江路 1518 弄1',
          code: '1234'
        },
        {
          date: '2020-08-04',
          name: '王小虎',
          thumb: 'https://lin-xin.gitee.io/images/post/node3.png',
          address: '上海市普陀区金沙江路 1517 弄',
          code: '4365'
        },
        {
          date: '2020-10-01',
          name: '李四',
          thumb: 'https://lin-xin.gitee.io/images/post/parcel.png',
          address: '上海市普陀区金沙江路 1519 弄',
          code: '5693'
        },
        {
          date: '2020-12-03',
          name: '小黑',
          thumb: 'https://lin-xin.gitee.io/images/post/notice.png',
          address: '上海市普陀区金沙江路 1516 弄',
          code: '9813'
        },
        {
          date: '2020-05-02',
          name: '张三',
          thumb: 'https://lin-xin.gitee.io/images/post/wms.png',
          address: '上海市普陀区金沙江路 1518 弄1'
        },
        {
          date: '2020-08-04',
          name: '王小虎',
          thumb: 'https://lin-xin.gitee.io/images/post/node3.png',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2020-10-01',
          name: '李四',
          thumb: 'https://lin-xin.gitee.io/images/post/parcel.png',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2020-12-03',
          name: '小黑',
          thumb: 'https://lin-xin.gitee.io/images/post/notice.png',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2020-05-02',
          name: '张三',
          thumb: 'https://lin-xin.gitee.io/images/post/wms.png',
          address: '上海市普陀区金沙江路 1518 弄1'
        },
        {
          date: '2020-08-04',
          name: '王小虎',
          thumb: 'https://lin-xin.gitee.io/images/post/node3.png',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2020-10-01',
          name: '李四',
          thumb: 'https://lin-xin.gitee.io/images/post/parcel.png',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2020-12-03',
          name: '小黑',
          thumb: 'https://lin-xin.gitee.io/images/post/notice.png',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2020-05-02',
          name: '张三',
          thumb: 'https://lin-xin.gitee.io/images/post/wms.png',
          address: '上海市普陀区金沙江路 1518 弄1'
        },
        {
          date: '2020-08-04',
          name: '王小虎',
          thumb: 'https://lin-xin.gitee.io/images/post/node3.png',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2020-10-01',
          name: '李四',
          thumb: 'https://lin-xin.gitee.io/images/post/parcel.png',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2020-12-03',
          name: '小黑',
          thumb: 'https://lin-xin.gitee.io/images/post/notice.png',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2020-05-02',
          name: '张三',
          thumb: 'https://lin-xin.gitee.io/images/post/wms.png',
          address: '上海市普陀区金沙江路 1518 弄1'
        },
        {
          date: '2020-08-04',
          name: '王小虎',
          thumb: 'https://lin-xin.gitee.io/images/post/node3.png',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2020-10-01',
          name: '李四',
          thumb: 'https://lin-xin.gitee.io/images/post/parcel.png',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2020-12-03',
          name: '小黑',
          thumb: 'https://lin-xin.gitee.io/images/post/notice.png',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2020-05-02',
          name: '张三',
          thumb: 'https://lin-xin.gitee.io/images/post/wms.png',
          address: '上海市普陀区金沙江路 1518 弄1'
        },
        {
          date: '2020-08-04',
          name: '王小虎',
          thumb: 'https://lin-xin.gitee.io/images/post/node3.png',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2020-10-01',
          name: '李四',
          thumb: 'https://lin-xin.gitee.io/images/post/parcel.png',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2020-12-03',
          name: '小黑',
          thumb: 'https://lin-xin.gitee.io/images/post/notice.png',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      tableData2: [],
      multipleSelection: [],
      formData: {
        searchVal: ''
      },
      loading: true,
      show: false,
      rowsId: '',
      editVisible: false,
      oldForm: {},
      newFrom: {},
      idx: null,
      vueQr: [{ code: '111' }, { code: '333' }],
      // printObj: {
      //     id: "prints", //打印指定内容id
      //     popTitle: '打印标题',//打印标题
      // },
      showViewer: false,
      srcList: [require('@/assets/images/01.jpg'), require('@/assets/images/02.jpg'), require('@/assets/images/03.jpg')]
    }
  },
  components: {
    VueQr
  },
  mounted() {
    this.page.pageTotal = this.tableData.length
    this.tableData2 = this.tableData
    this.loading = false
    this.show = true
    // 全选默认禁用 新增11
    this.$nextTick(() => {
      // document.getElementsByClassName('el-checkbox__input').addClass("is-disabled");
      console.log(111)
    })
    // 在
  },
  methods: {
    selectable(row, index) {
      // console.log(this.tableData,"000")
      // const rowsId = this.rowsId // 选中的id
      // // console.log(this.rowsId,"999")
      // if (rowsId || rowsId == 0) {
      //   const tableDataArr = this.tableData // 拿到记录选中表单的数组
      //   const arr = []
      //   for (const ite in tableDataArr) {
      //     if (tableDataArr[ite].checkBox == true) {
      //       arr.push(ite)
      //     }
      //   }
      //   // console.log(arr,"拿到选中的索引值数组")
      //   let indexs1
      //   if (rowsId > 0) {
      //     indexs1 = arr[0] - 1
      //   } else {
      //     indexs1 = 0
      //   }
      //   const indexs2 = parseInt(arr[arr.length - 1]) + 1 // 最后一个加1
      //   if (
      //     row.id == indexs1 ||
      //     row.id == indexs2 ||
      //     row.id == arr[0] ||
      //     row.id == arr[arr.length - 1] ||
      //     arr.length == 0
      //   ) {
      //     return 1
      //   }
      // } else {
      return 1 // 初始全部可勾选
      // }
    },
    // 单选中的全部表单 selection为选中所有数组，rows为选中当前表格对象
    handleSelectionChange(selection, rows) {
      this.multipleSelection = selection
      // 如果selected为true表示勾选，为false或者0表示取消勾选
      // const selected = selection.length && selection.indexOf(rows) !== -1
      // const tableDataArr = this.tableData
      // for (const ite in tableDataArr) {
      //   if (rows.id == ite) {
      //     tableDataArr[ite].checkBox = selected
      //   }
      // }
      // // console.log(this.tableData,"77")
      // this.rowsId = rows.id // 将当前选择的id(索引)
      // this.$nextTick(() => {
      //   // let cc = document.getElementsByClassName('el-checkbox__input')
      //   // document.getElementsByClassName('el-checkbox__input').addClass("is-disabled");
      // })
    },
    // 表单全选
    handleSelectionAll(selection) {
      this.$nextTick(() => {
        // document.getElementsByClassName('el-checkbox__input').addClass("is-disabled");
      })
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.page.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page.pageNum = val
    },
    // 编辑操作
    handleEdit(index, row) {
      console.log(row, 'row')
      this.idx = index
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.newFrom = row
      this.editVisible = true
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.$message.success('删除成功')
          this.tableData.splice(index, 1)
        })
        .catch(() => {})
    },
    // 弹窗保存编辑
    saveEdit() {
      this.editVisible = false
      this.$message.success(`修改第 ${this.idx + 1} 行成功`)
      this.$set(this.tableData, this.idx, this.oldForm)
    },
    // 弹窗取消编辑
    cancelEdit() {
      this.editVisible = false
    },
    // 正则验证
    changCode() {
      this.$nextTick(() => {
        if (this.formData.searchVal != null) {
          this.formData.searchVal = this.formData.searchVal.replace(/[^a-zA-Z0-9]/gi, '')
        }
      })
    },
    // 查询
    Inquire() {
      const searchVal = this.formData.searchVal
      if (searchVal) {
        this.tableData = this.tableData.filter(data => !searchVal || data.id.toLowerCase().includes(searchVal.toLowerCase()))
      } else {
        this.tableData = this.tableData2
      }
      this.page.pageTotal = this.tableData.length
    },
    // 导出表格
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../utils/excel/Export2Excel')
        const tHeader = ['日期', '姓名', '头像', '地址']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['date', 'name', 'thumb', 'address']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '列表excel')
      })
    },
    // 文件件流下载
    exportExcel() {
      //
      // 请求的文件流要加 responseType: 'blob'   axios.post(url,data,responseType:'blob')
      // data:文件流
      const blob = new Blob([data], { type: 'application/octet-stream;charset=utf-8' })
      const link = document.createElement('a') // a标签下载
      link.href = window.URL.createObjectURL(blob)
      link.download = '模板.xlsx'
      link.click()
      window.URL.revokeObjectURL(link.href)
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 打印表格中的二维码
    setPrint() {
      if (this.multipleSelection.length === 0) return this.$message.warning('请选择打印的数据！')
      this.$print(this.$refs.prints)
    },
    // 关闭查看更多图片
    closeViewer() {
      this.showViewer = false
    }
  }
}
</script>
<style lang="less" scoped>
#tables {
  // overflow: hidden;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
