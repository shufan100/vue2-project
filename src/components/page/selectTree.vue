<template>
  <el-select ref="selectTree" v-model="form.id" filterable placeholder="请选择...">
    <el-option :key="form.id" :value="form.id" :label="form.label" style="height: auto" hidden />
    <el-tree ref="tree" :data="data" :props="defaultProps" node-key="id" accordion @node-click="handleClickNode" />
  </el-select>
</template>
<script>
export default {
  data () {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 11,
          label: '二级 1-1',
          children: [{
            id: 111,
            label: '三级 1-1-1',
            children: [{
              id: 1111,
              label: '四级 1-1-1-1'
            }, {
              id: 1112,
              label: '四级 1-1-1-2'
            }]
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 21,
          label: '二级 2-1',
          children: [{
            id: 211,
            label: '三级 2-1-1'
          }]
        }, {
          id: 22,
          label: '二级 2-2',
          children: [{
            id: 221,
            label: '三级 2-2-1'
          }]
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 31,
          label: '二级 3-1',
          children: [{
            id: 311,
            label: '三级 3-1-1'
          }]
        }, {
          id: 32,
          label: '二级 3-2',
          children: [{
            id: 321,
            label: '三级 3-2-1'
          }]
        }]
      }],
      treeList: [],
      defaultProps: {
        label: 'label',
        children: 'children'
      },
      form: {
        id: '',
        label: ''
      }
    }
  },
  methods: {
    // 节点点击事件
    handleClickNode (data, node, node2) {
      this.form.id = data.id
      this.form.label = data.label
      // 选择器执行完成后，使其失去焦点隐藏下拉框的效果
      // this.$refs.selectTree.blur()
      const aa = this.$refs.tree.getNode()
      console.log(data)
    }
  }
}
</script>
