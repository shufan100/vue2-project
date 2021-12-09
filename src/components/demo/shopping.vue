<template>
  <div>
    <el-table border :data="tableData" @select='select' @select-all='selectAll' style="width: 100%">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="name" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="price" label="商品单价/元" width="120"></el-table-column>
      <el-table-column prop="num" label="商品数量/个" width="300">
        <template slot-scope="scope">
          <!-- 只能输入正整数 -->
          <el-input oninput="value=value.replace(/[^0-9]/g,'')" v-model="scope.row.num" @input="inputs(scope.row)"></el-input>
          <!-- 只能输入小数 -->
          <!-- <el-input oninput ="value=value.replace(/[^0-9.]/g,'')"  v-model="scope.row.num"></el-input> -->
        </template>
      </el-table-column>
      <el-table-column prop="subtotal" label="商品小计/元" width="120"></el-table-column>
    </el-table>
    <div>{{numbers}}件商品</div>
    <div>总计：{{total}}</div>
    <hr />

    <!--  -->
    <h2>input实现vue双向数据绑定</h2>
    {{username}}
    <br />
    <!-- v-model是value+input的语法糖，1.绑得value，2.触发输入事件@input -->
    <!-- <input class="input" type="text" :value="username" @input="username=$event.target.value"> -->
    <!-- 1'绑得value -->
    <my-input type="text" v-model="username"></my-input>
  </div>
</template>
<script>
import myinput from './my-input'
export default {
  components: { 'my-input': myinput },
  data () {
    return {
      total: 0,
      numbers: 0,
      selectArr: [],
      tableData: [
        {
          name: '苹果',
          price: 26,
          num: 1,
          subtotal: 26
        },
        {
          name: '香蕉',
          price: 4,
          num: 10,
          subtotal: 100
        },
        {
          name: '桃子',
          price: 24,
          num: 1,
          subtotal: 24
        }
      ],
      username: 'xx'
    }
  },
  mounted () { },
  methods: {
    // 输入个数
    inputs (row) {
      console.log(row.num)
      if (!row.num || row.num == 0) row.num = 1
      row.subtotal = parseInt(row.num) * row.price
      let sum = 0
      for (const item of this.selectArr) {
        sum += item.subtotal
      }
      this.total = sum
    },
    // 单选
    select (selection, row) {
      this.numbers = selection.length
      let sum = 0
      for (const item of selection) {
        sum += item.subtotal
      }
      this.total = sum
      this.selectArr = selection
    },
    // 全选
    selectAll (selection) {
      let sum = 0
      for (const item of selection) {
        sum += item.subtotal
      }
      this.total = sum
      this.numbers = selection.length
      this.selectArr = selection
    }
  }
}
</script>
<style lang="less" scoped>
.input {
  border: 1px solid red;
}
</style>
