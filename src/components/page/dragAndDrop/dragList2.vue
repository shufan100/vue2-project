<template>
  <div class="dragList2">
    <h2>列表拖到对应的位置（拖到谁前面，推到谁后面）</h2>
    <p
      v-for="i in list"
      :key="i.id"
      draggable="true"
      @dragstart="dragstart($event, i)"
      @dragenter="dragenter($event, i)"
      @dragend="dragend($event, 'list')"
      @dragover="dragover($event)"
    >
      {{ i.id }} -- {{ i.name }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'dragList2',
  data() {
    return {
      list: [
        { id: '001', name: '掘金1' },
        { id: '002', name: '掘金2' },
        { id: '003', name: '掘金3' },
        { id: '004', name: '掘金4' },
        { id: '005', name: '掘金5' },
        { id: '006', name: '掘金6' },
        { id: '007', name: '掘金7' },
        { id: '008', name: '掘金8' }
      ],
      oldDataItem: '', // 开始拖动的值
      newDataItem: '' // 拖动到对应位置的值
    }
  },
  mounted() {},
  methods: {
    // 开始拖动
    dragstart(e, val) {
      console.log('dragstart', val.name)
      this.oldDataItem = val
    },
    // 移动过程中的信息
    dragenter(e, val) {
      console.log('dragenter', val.name)
      this.newDataItem = val
      e.preventDefault()
    },
    // 拖拽结果操作
    dragend(e, param) {
      // console.log(e, val)
      if (this.oldDataItem.id !== this.newDataItem.id) {
        // console.log( this.oldDataItem, this.newDataItem)
        const oldIndex = this[param].indexOf(this.oldDataItem) // 拖动之前额索引
        const newIndex = this[param].indexOf(this.newDataItem) // 拖动之后的索引

        console.log('拖动切换索引:', oldIndex, newIndex)
        const newItem = [...this[param]]
        // // 删除老节点
        newItem.splice(oldIndex, 1)
        // // 新增节点
        newItem.splice(newIndex, 0, this.oldDataItem)
        this[param] = [...newItem]
      }
    },
    dragover(e) {
      e.preventDefault()
    }
  }
}
</script>
<style lang="less" scoped>
.dragList2 {
  p {
    width: 100%;
    height: 40px;
    // margin: 5px 0;
    padding: 0 20px;
    background: beige;
    cursor: pointer;
    line-height: 40px;
    &:nth-child(2n) {
      background: cadetblue;
    }
  }
}
</style>
