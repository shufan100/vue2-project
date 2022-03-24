<template>
  <el-cascader
    :options="options"
    :props="{ multiple: true }"
    clearable
    v-model="selectedValue"
    @change="change"
  ></el-cascader>
</template>
<script>
import _ from 'lodash'
export default {
  data () {
    return {
      selectedValue: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          disabled: false,
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              disabled: false,
              children: [
                {
                  value: 'yizhi',
                  label: '一致',
                  disabled: false
                },
                {
                  value: 'fankui',
                  label: '反馈',
                  disabled: false
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控',
                  disabled: false
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              disabled: false,
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航',
                  disabled: false
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航',
                  disabled: false
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          disabled: false,
          children: [
            {
              value: 'basic',
              label: 'Basic',
              disabled: false,
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局',
                  disabled: false
                },
                {
                  value: 'color',
                  label: 'Color 色彩',
                  disabled: false
                },
                {
                  value: 'typography',
                  label: 'Typography 字体',
                  disabled: false
                },
                {
                  value: 'icon',
                  label: 'Icon 图标',
                  disabled: false
                },
                {
                  value: 'button',
                  label: 'Button 按钮',
                  disabled: false
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    selectedValues () {
      return this.selectedValue.map((item) => {
        if (_.isArray(item)) {
          return _.last(item)
        } else {
          return item
        }
      })
    }
  },
  methods: {
    change (val) {
      this.options = this.setCanSelect(this.options)
    },
    setCanSelect (items) {
      items.forEach((item, index) => {
        const disable = this.selectedValues.length >= 2
        items[index].disabled = this.selectedValues.indexOf(item.value) > -1 ? false : disable
        if (_.get(item, 'children', false)) {
          this.setCanSelect(item.children)
        }
      })
      return items
    }
  }
}
</script>
