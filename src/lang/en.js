import router from '@/router'
const routerObj = {}
// 递归修改i18的对应的title
function setI18nTitle(arr, parentName = '') {
  for (const i of arr) {
    if (!routerObj[i.name]) {
      if (parentName) {
        routerObj[i.name] = i.name.replace(/^\S/, s => s.toUpperCase()) || 'en'
      } else {
        routerObj[i.name] = i.name.replace(/^\S/, s => s.toUpperCase()) || 'en'
      }
      if (i?.children) {
        setI18nTitle(i.children, i.name + '/')
      }
    }
  }
}
setI18nTitle(router.options.routes[0].children)
const en = {
  i18n: {
    userName: 'SHUF',
    admin: 'admin',

    // home:'Home',
    form: 'Form',
    // form1:'FormTable',
    // table:'Table',
    // editor:'Editor',
    // markdown:'Markdown',
    // nativeTable:'NativeTable',
    info: 'Info',
    // userInfo:'UserInfo',
    // modifyInfo:'ModifyInfo',
    // msgCenter:'MsgCenter',
    // share:'Share',
    demo: 'Demo',
    // threeD:'3D',
    // upload:'Upload',
    // shopping:'Shopping',
    // printer:"Printer",
    // iconfont:"Iconfont",
    // magnifying:'Magnifying',
    // exportPdf:'ExportPdf',
    dragAndDrop: 'DragAndDrop',
    // dialog:'Dialog',
    // dragList:'DragList',
    EChartsCom: 'EChartsCom',
    // echartsMap:'EChartsMap',
    permissions: 'Permissions',
    // pagePermissions:'PagePermissions',
    // btnPermissions:'BtnPermissions',
    errorPage: 'ErrorPage',
    403: '403',
    404: '404'
  }
}
Object.assign(en.i18n, routerObj)
export default en
