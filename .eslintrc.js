// 代码写法规则
module.exports = {
  root: true, // 会停止在父级目录中寻找
  // 设置环境
  env: {
    es6: true, // 启用 ES6 语法支持以及新的 ES6 全局变量或类型
    node: true, // Node.js 全局变量和 Node.js 作用域
    browser: true, // 浏览器全局变量
  },
  /**
   * 规则继承
   */
  extends: [
    'eslint:recommended', // 启用eslint默认的规则
    'plugin:vue/essential', // vue的默认格式规则
    // 'plugin:prettier/recommended', // vue的默认格式规则
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  /**
   * 解析器配置
   */
  parserOptions: {
    parser: 'babel-eslint', // 解析器，默认使用Espree
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['vue'],
  /**
   * ESLint代码规则
   *      https://cn.eslint.org/docs/rules/
   *      eslint检查规则：0/off：关闭； 1/warn：警告；2/error:错误
   */
  rules: {
    strict: 2, //使用严格模式
    // 基础
    indent: ['error', 2], // 强制使用一致的缩进
    semi: ['error', 'never'], // 句尾去除分号
    'space-infix-ops': 2, //操作符周围要有空格
    'semi-spacing': [2, { before: false, after: true }], //分号前后空格
    quotes: ['error', 'single'], // 强制使用单引号
    'max-len': ['error', 160], // 一行的最大长度
    'comma-spacing': 'error', //逗号前后的空格
    'no-multiple-empty-lines': 'error', // 禁止出现多行空行
    'no-trailing-spaces': 'error', // 代码后面空白
    curly: ['off', 'all'], //必须使用 if(){} 中的{}
    // 调试
    'no-console': 'warn', //使用console报警告
    'no-debugger': 'warn', // 使用debugger报警告
    /**
     * JS
     */
    'no-unreachable': 2, //不能有无法执行的代码
    'no-unused-expressions': 2, //禁止无用的表达式
    'no-constant-condition': 'error', //禁止在条件中使用常量表达式 if(true) if(1)
    'no-else-return': 'error', //如果if语句里面有return,后面不能跟else语句
    'no-empty': 'error', //if块语句中的内容不能为空
    'no-lonely-if': 'error', //禁止else语句内只有if语句
    'no-return-assign': 'warn', //return 语句中不能有赋值表达式
    'block-scoped-var': 'error', //块语句中使用var
    'default-case': 'error', //switch语句最后必须有default
    'no-unexpected-multiline': 2, //避免多行表达式
    // JS-定义
    'no-var': 'error', //禁用var，用let和const代替
    'no-floating-decimal': 'error', //禁止省略浮点数中的0
    'no-unneeded-ternary': 'error', //禁止不必要的嵌套 let isYes = a === 1 ? true : false; ==> let isYes = a === 1
    // JS-数组
    'array-bracket-spacing': ['error', 'never'], //空数组里面不允许有多余的空格
    // JS-对象
    // 'comma-dangle': ['error', 'never'], // 对象尾不能有逗号
    'key-spacing': ['error', { beforeColon: false, afterColon: true }], //对象字面量中冒号的前后空格
    // JS-函数
    'new-parens': 2, //new时必须加小括号
    'arrow-spacing': 2, //箭头函数=>前/后加空格
    'arrow-body-style': ['warn', 'as-needed'], // 箭头函数直接返回的时候不需要 大括号{}
    'space-infix-ops': 2, //中缀操作符周围要不要有空格
    'space-before-blocks': [2, 'always'], //函数(){}中间增加空格
    'space-before-function-paren': [2, 'never'], // 在函数和括号中间加空格
    'max-params': ['warn', 3], //函数最多只能有3个参数
    'no-param-reassign': 'error', //禁止给参数重新赋值
    'no-spaced-func': 'error', //函数调用时 函数名与()之间不能有空格
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used' }], //不能有声明后未被使用的变量或参数

    // vue
    'vue/multi-word-component-names': 'off', //多单词的组件名称 (要求vue组件为多单词，HTML全部都是单个单词)
    'vue/no-unused-components': 'off',
  },
}
