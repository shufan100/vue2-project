<template>
  <div class="form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动树选择" prop="trees">
        <el-select :value="ruleForm.trees" placeholder="请选择活动区域">
          <el-option :value="ruleForm.trees" style="height: auto">
            <el-tree :data="treeData" :props="defaultProps" default-expand-all node-key="label"></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" :picker-options="pickerOptions0" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"> - </el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm.date2"
              :picker-options="{
                selectableRange: '18:30:00 - 23:59:59'
              }"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 懒加载树 -->
    <el-tree :props="props" :load="loadNode" lazy :default-expanded-keys="[defaaultExpend]"> </el-tree>
    <!--  -->
    <selectTree></selectTree>
  </div>
</template>

<script>
import selectTree from './selectTree'
export default {
  components: { selectTree },
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        trees: '',
        date1: new Date(),
        date2: new Date(new Date().setHours(18, 30, 0, 0)),
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        region: [
          {
            required: true,
            message: '请选择活动区域',
            trigger: 'change'
          }
        ],
        // date1: [
        //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // date2: [
        //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          {
            required: true,
            message: '请选择活动资源',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            message: '请填写活动形式',
            trigger: 'blur'
          }
        ]
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7 // 如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      treeData: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            },
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // tree
      num: 0,
      defaaultExpend: null,
      props: {
        label: 'label',
        children: 'children',
        isLeaf: 'isOrg'
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        const data = [
          {
            isOrg: false,
            label: '国网太原供电公11司',
            value: '057252DF490D45E6E050007F01007437'
          }
        ]
        resolve(data)
      }
      this.defaaultExpend = '057252DF490D45E6E050007F01007437'
      if (node.level > 1) return resolve([])
      this.num++
      setTimeout(() => {
        console.log(this.num)
        let data2 = []
        if (this.num === 1) {
          data2 = [
            {
              label: '国网太原供电公司1111',
              isOrg: true
            },
            {
              label: '国网太原供电公司2222',
              isOrg: false
            }
          ]
        } else {
          data2 = [
            {
              label: '二级1',
              isOrg: true
            },
            {
              label: '二级2',
              isOrg: true
            }
          ]
        }
        resolve(data2)
      }, 500)
    }
  }
}
</script>

<style lang="less">
.form {
  display: flex;
  height: 100%;
  .el-form {
    flex: 1.5;
    padding-right: 20px;
    margin-right: 20px;
    border-right: 10px solid red;
  }
  .el-tree {
    flex: 2;
  }

  // .el-select-dropdown__list{
  //     height: 100%;
  // }
  // .el-select-dropdown__item{
  //     height: auto !important;
  // }
  // .el-select-dropdown__item.selected{
  //     // height: auto;
  //     overflow: auto;
  // }
}
</style>
