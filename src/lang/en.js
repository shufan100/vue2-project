import router from '@/router';
let routerObj ={}
console.log(router.options.routes[0].children,'router.options.routes[0].children')
for(let item of router.options.routes[0].children){
    routerObj[item.name] = item.name || '';
}
const en ={
    i18n:{
        userName:'SHUF',
        admin:'admin',

        // home:'Home',
        form:"Form",
        // form1:'FormTable',
        // table:'Table',
        // editor:'Editor',
        // markdown:'Markdown',
        // nativeTable:'NativeTable',
        info:'Info',
        // userInfo:'UserInfo',
        // modifyInfo:'ModifyInfo',
        // msgCenter:'MsgCenter',
        // share:'Share',
        demo:'Demo',
        // threeD:'3D',
        // upload:'Upload',
        // shopping:'Shopping',
        // printer:"Printer",
        // iconfont:"Iconfont",
        // magnifying:'Magnifying',
        // exportPdf:'ExportPdf',
        dragAndDrop:'DragAndDrop',
        // dialog:'Dialog',
        // dragList:'DragList',
        EChartsCom:'EChartsCom',
        // echartsMap:'EChartsMap',
        permissions:'Permissions',
        // pagePermissions:'PagePermissions',
        // btnPermissions:'BtnPermissions',
        errorPage:'ErrorPage',
        403:'403',
        404:'404'
    }
}
Object.assign(en.i18n,routerObj)
console.log(en)
export default en;