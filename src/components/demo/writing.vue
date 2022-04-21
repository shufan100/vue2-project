<template>
  <div id="writing">
    <h1>基础语法</h1>
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
    <h4>今天天气很{{ HotComputed }}</h4>
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

    <el-divider>动画效果（transition）</el-divider>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <!-- name='tans1':定义了name,样式就要改 appear：初始动画 -->
    <transition name='trans1' appear>
      <h1 v-show="isShow" style="background:red">欢迎！！！</h1>
    </transition>

    <el-divider>过渡效果</el-divider>
    <button @click="isShow1 = !isShow1">显示/隐藏</button>
    <!-- name='tans1':定义了name,样式就要改 appear：初始动画 -->
    <transition name='trans2' appear>
      <h1 v-show="isShow1" style="background:red">欢迎！！！</h1>
    </transition>
    <!-- 多个过渡 -->
    <transition-group name='trans2' appear>
      <h1 v-show="isShow1" key="1" style="background:red">欢迎！！！</h1>
      <h1 v-show="!isShow1" key="2" style="background:red">欢迎！！！</h1>
    </transition-group>

    <el-divider>过渡效果(插件animate.css)</el-divider>
    <!-- name是固定写法 -->
    <transition-group name='animate__animated animate__bounce' appear enter-active-class="animate__zoomInDown" leave-active-class="animate__rollOut">
      <h1 v-show="isShow1" key="11" style="background:red">欢迎！！！</h1>
      <h1 v-show="isShow1" key="22" style="background:red">欢迎！！！</h1>
    </transition-group>

    <el-divider>Vuex</el-divider>
    <h2>计算属性读取vuex的state值 / getters计算后的值</h2>
    <ul>
      <li>原生读取state: {{codexxx}}</li>
      <li>------</li>
      <li>对象读取state: {{xxs1}}</li>
      <li>对象读取state模块对象: {{func1}}</li>
      <li>对象读取state模块对象内的值: {{info}}</li>
      <li>------</li>
      <li>数组读取state: {{sum}}</li>
      <li>数组读取state模块对象: {{func}}</li>
      <li style="color:red">数组读取state模块对象内的值: {{userName}}</li>
      <li style="color:red">数组读取state模块对象内的值: {{datas}}</li>
      <!-- <li>{{func === func1}}</li> -->
      <li>------</li>
      <li>数组读取getters修改的state: {{gName1}}</li>
      <li>数组读取命名空间的getters修改的state: {{gUserName}}</li>
    </ul>
    <hr />
    <ul>
      <li>原本值sum: {{sum}}</li>
      <li>放大10倍sum: {{bigSum}}</li>
      <li>缩小2倍sum: {{smallSum}}</li>
    </ul>
    <button @click="addSumA">数组写法：action ++</button>
    <button @click="addSumA1(2)">对象写法(带参)：action ++1</button>
    <button @click="addSumA2">对象写法(不带参)：action ++1</button>
    <br />
    <button @click="addSumM">数组写法：mutation ++</button>
    <button @click="addSumM1">对象写法：mutation ++</button>
    <br />
    <button @click="cs">cs</button>
    <button @click="cs2">cs2</button>
    <button @click="CS">CS</button>
    <button @click="CS2">CS2</button>
    <br />
    <span>{{name1}}</span>---<button @click="axionsCs2">请求</button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
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
      ivalue: 100,
      isShow: true,
      isShow1: true
    }
  },
  // computed：1有缓存; 2初始调用多次只会触发一次; 3当所依赖的数据发生变化会触发计算属性
  computed: {
    // ------------------------------------------------组件内的计算属性读取vuex(state,getters)------------------------------------------------------------
    // # 借助mapState生成计算属性，从state中读取数据（对象写法，数组写法）
    codexxx () {
      return this.$store.state.codes
    },
    // 对象写法
    ...mapState({
      xxs1: 'counts', // 直接读取state
      func1: state => state.func, // 读取模块对象
      info: state => state.func.info, // 读取模块对象属性
      name1: state => state.func.name1 // 读取模块对象属性
    }),
    // 数组写法
    ...mapState(['sum', 'func']), // 读取state 和 模块对象
    ...mapState('user', ['userName', 'datas']), // 直接读取模块对象里的值（模块对象命名空间要设计》》 namespaced: true, // 命名空间）

    // # 借助mapGetters生成计算属性，从state中读取数据（数组写法）
    ...mapGetters(['bigSum', 'smallSum', 'gName1']),
    ...mapGetters('user', ['gUserName']), // getter 数组写法 //因为设置了命名空间
    // ------------------------------------------------组件内的计算属性------------------------------------------------------------
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
      return this.name
    },
    HotComputed () {
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
    console.log('writing组件--created生命周期钩子', this.$store)
  },
  mounted () {
    console.log(mapState({ sum: 'sum' }), '00')
  },
  methods: {
    // vuex
    // action---------------------------------------------
    ...mapActions(['jiasum', 'cs2', 'axionsCs2']), // mutations 数组写法
    ...mapActions('user', ['cs']), // mutations 数组写法 //因为设置了命名空间
    ...mapActions({ addSumA1: 'jiasum', addSumA2: 'jiasum1' }), // mutations 对象写法(接收一个参数)
    addSumA () {
      this.jiasum(1)
      // this.$store.dispatch('jiasum', 1) // 原始写法
    },
    // mutation---------------------------------------------
    ...mapMutations(['JIASUM', 'CS2']), // action 数组写法
    ...mapMutations('user', ['CS']), // mutations 数组写法 //因为设置了命名空间
    ...mapMutations({ addSumM1: 'JIASUM2' }), // action 对象写法(接收一个参数)
    addSumM () {
      this.JIASUM(1)
      // this.$store.commit('JIASUM', 1) // 原始写法
    },
    // -------------------------------------------------------
    clicks () {
      alert(111)
    },
    scroll1 () {
      console.log('滚动条动了就会一直触发（滚轮和上下键都会触发）')
    },
    wheel1 () {
      console.log('滚轮动了就会触发，不管滚动条有没有到底（上下键不会触发）') // https://api.uixsj.cn/hitokoto/get?type=social
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
  //------------------动画写法-----------------------------
  //进入需要激活的动画
  .trans1-enter-active {
    // .v-enter-active {
    animation: trans1 0.5s linear;
  }
  //离开需要激活的动画
  .trans1-leave-active {
    // .v-leave-active {
    // reverse反转
    animation: trans1 0.5s reverse;
  }
  @keyframes trans1 {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0px);
    }
  }

  //------------------过渡写法-----------------------------
  .trans2-enter-active,
  .trans2-leave-active {
    transition: 0.5s linear;
  }
  // 进入的起点、离开的终点
  .trans2-enter,
  .trans2-leave-to {
    transform: translateX(-100%);
  }
  // 进入的终点、离开的起点
  .trans2-enter-to,
  .trans2-leave {
    transform: translateX(0);
  }
}
</style>
