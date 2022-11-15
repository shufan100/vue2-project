import router from '@/router'
const routerObj = {}
// 递归修改i18的对应的title
function setI18nTitle(arr, parentName = '') {
  for (const i of arr) {
    if (!routerObj[i.name]) {
      if (parentName) {
        routerObj[parentName + i.name] = i.meta.title || 'zh'
      } else {
        routerObj[i.name] = i.meta.title || 'zh'
      }
      if (i?.children) {
        setI18nTitle(i.children, i.name + '/')
      }
    }
  }
}
setI18nTitle(router.options.routes[0].children)
const zh = {
  i18n: {
    userName: '舒梵',
    admin: '管理员',

    // home:'首页',
    // form: '表单',
    // form1:'Form表单',
    // table:'基础表格',
    // editor:'富文本编辑器',
    // markdown:'Markdown编辑器',
    // nativeTable:'原生表格',
    info: '信息管理',
    // userInfo:'个人信息',
    // modifyInfo:'修改信息',
    // msgCenter:'消息中心',
    // share:'分享功能',
    demo: '案例',
    // shopping:'购物车',
    // threeD:'3D旋转图',
    // upload:'图片上传',
    // printer:'打印机',
    // iconfont:'矢量图标',
    // magnifying:'放大镜',
    // exportPdf:'导出PDF',
    dragAndDrop: '拖拽组件',
    // dialog:'拖拽弹窗',
    // dragList:'拖拽列表',
    EChartsCom: '地图组件',
    // echartsMap:'ECharts地图',
    permissions: '权限设置',
    // pagePermissions:'页面权限',
    // btnPermissions:'按钮权限',
    errorPage: '错误页面'
    // 403:'403',
    // 404:'404'
  }
}
Object.assign(zh.i18n, routerObj)
export default zh
