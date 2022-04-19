<template>
  <div id="writing">
    <h1 style="text-align: center">基础语法</h1>
    <!-- 事件 -->
    <el-divider>事件</el-divider>
    <a :href="url" @click.prevent="clicks">阻止默认事件</a>
    <div class="gl">
      <ul @scroll="scroll1">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      <ul @wheel="wheel1">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
    <!-- 键盘事件 -->
    <el-divider>键盘事件</el-divider>
    <div style="width: 300px">
      <!-- 2、借助vue修饰符 -->
      <input type="text" placeholder="输入按回车再触发" @keyup.space="showInfo" />
      <el-input v-model="value" @input="showInfo" />
    </div>
    <button @click="getHello">全局方法</button>

    <!-- computed计算属性 -->
    <el-divider>computed计算属性</el-divider>
    <h4>{{ fullname }}</h4>
    <h4>{{ fullname }}</h4>
    <h4>{{ fullname }}</h4>
    <el-input type="text" v-model="name" />
    <h3>{{ full2 }}</h3>
    <h3>{{ full2 }}</h3>

    <!--计算属性例子1：  -->
    <el-divider>计算属性例子1：</el-divider>
    <h4>{{ obj.a }}--{{ obj.b }}</h4>
    <button @click="add('a')">添加a</button>
    <button @click="add('b')">添加b</button>
    <button @click="add('add')">添加a,b</button><br />

    <!--计算属性例子2：  -->
    <el-divider>计算属性例子2：</el-divider>
    <el-input style="width:200px" placeholder="模糊搜索" v-model="keyval" />
    <button @click="type=1">升序</button>
    <button @click="type=2">降序</button>
    <button @click="type=0">原来顺序</button>
    <ul>
      <li v-for="item in newperson" :key="item.id">
        {{ item.name }}--{{ item.age }}
      </li>
    </ul>

    <!-- watch侦听 -->
    <el-divider>watch侦听</el-divider>
    <h4>今天天气很{{ info }}</h4>
    <button @click="isHot = !isHot">修改</button>

    <!-- filters过滤器 -->
    <el-divider>filters过滤器</el-divider>
    <h4>{{ time | timeFilter }}</h4>
    <h4>{{ time | timeFilter('YYYY_MM_DD') }}</h4>
    <h4>{{ time | winFilter }}</h4>

    <!-- 自定义指令 -->
    <el-divider>自定义指令</el-divider>
    <button v-preventReClick>11</button>
    <input type="text" v-fbind:value='obj.a'>
    <input type="text" v-sbind:value='obj.b'>

    <el-divider>全局事件总线（$bus兄弟通信）</el-divider>
    <span>绑定事件的组件一定要渲染成功，兄弟组件触发才能触发到</span><br />
    <el-button @click="globalEvent">触发兄弟事件</el-button>

    <el-divider>消息订阅（pubsub）</el-divider>
    <el-button @click="pubsubEvent">触发消息订阅</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      url: 'https://www.baidu.com/',
      value: '',
      name: '张三',
      sex: '女',
      isHot: true,
      obj: {
        a: 1,
        b: 10
      },
      person: [
        { id: '001', name: '马冬梅', age: 40 },
        { id: '002', name: '周冬雨', age: 20 },
        { id: '003', name: '周杰伦', age: 30 },
        { id: '004', name: '艾伦', age: 10 }
      ],
      keyval: '',
      type: 0,
      time: 1621561377603,
      ivalue: 100
    }
  },
  // computed：1有缓存; 2初始调用多次只会触发一次; 3当所依赖的数据发生变化会触发计算属性
  computed: {
    fullname: {
      // 这个get就是vue的数据劫持 的Objet.definePorperty()方法内的get和set方法
      get () {
        console.log('计算属性-----get被调用了 ')
        return this.name + this.sex
      },
      set (value) {
        return value
      }
    },
    // 简写--------------------------
    full2 () {
      console.log(1111)
      return this.name
    },
    info () {
      return this.isHot ? '炎热' : '凉爽'
    },
    newperson () {
      const arr = this.person.filter(i => {
        return i.name.indexOf(this.keyval) !== -1
      })
      //
      if (this.type) {
        // 排序
        arr.sort((a, b) => {
          return this.type === 1 ? a.age - b.age : b.age - a.age
        })
      }
      return arr
    }
  },
  watch: {
    // 正常写法-----------------------------------
    // isHot: {
    //   immediate: false, // true初始化让handler调用一下（默认false）
    //   handler(newVal, oldVal) {
    //     console.log(newVal, oldVal)
    //   }
    // },
    // 深度监听
    obj: {
      deep: true, // 开启深度监听
      handler (newVal, oldVal) {
        console.log('监听obj对象里所有苏属性', this.obj)
      }
    },
    // 简写----------------------
    isHot () {
      console.log(this.isHot, '---watch监听isHot')
    },
    'obj.a' () {
      // 监听对象的单个属性
      console.log('监听属性a')
    },
    'obj.b' () {
      // 要写成箭头函数
      setTimeout(function () {
        console.log(this, '---这里的this是指向window')
      }, 100)
      console.log('监听属性b')
    }
  },
  filters: {
    // 可以接收多个参数，第一个是数据，第二个是参数
    timeFilter (value, type) {
      return type ? '2022_04_17' : '2022_04_17 17:09:45'
    }
  },
  created () {
    console.log('writing组件--created生命周期钩子')
  },
  methods: {
    clicks () {
      alert(111)
    },
    scroll1 () {
      console.log('滚动条动了就会一直触发（滚轮和上下键都会触发）')
    },
    wheel1 () {
      console.log('滚轮动了就会触发，不管滚动条有没有到底（上下键不会触发）')
    },
    // 按下回车触发
    showInfo (e) {
      // 1、按键编码 回车编码===13
      // if (e.keyCode !== 13) return
      console.log(e.keyCode, e.key)
      console.log(e.target.value)
      // console.log(this.value)
    },
    add (type) {
      type === 'a' && this.obj.a++
      type === 'b' && this.obj.b++
      if (type === 'add') {
        this.obj.a++
        this.obj.b++
      }
    },
    // 触发全局事件总线$bus绑定的事件
    globalEvent () {
      console.log(122222)
      this.$bus.$emit('busClick', '数据123')
    },
    // 触发消息订阅
    pubsubEvent () {
      this.$pubSub.publish('pubsubClick', '99999')
    }
  }
}
</script>
<style lang="less" scoped>
#writing {
  .gl {
    display: flex;
    ul {
      background: goldenrod;
      width: 200px;
      height: 100px;
      margin-right: 10px;
      overflow-y: scroll;
      li {
        width: 100%;
        height: 50px;
      }
    }
  }
}
</style>
