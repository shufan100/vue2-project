/*
 * @Author: shufan100 1549248097@qq.com
 * @Date: 2022-11-15 15:54:13
 * @LastEditors: shufan100 1549248097@qq.com
 * @LastEditTime: 2022-11-15 16:33:31
 * @FilePath: \vue2-project\src\router\module\newFrom.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ChildLayout from '@/layout/childHome.vue'
export default {
  path: '/info',
  name: 'info',
  component: ChildLayout,
  // redirect: 'userInfo', // 默认显示第一个子路由、
  meta: { title: '信息管理' },
  children: [
    {
      path: 'userInfo',
      name: 'userInfo',
      component: () => import('@/views/info/infoShow'),
      meta: {
        parentTitle: '信息管理',
        title: '个人信息',
        path: 'info/userInfo',
        permissions: true
      }
    },
    {
      path: 'modifyInfo',
      name: 'modifyInfo',
      component: () => import('@/views/info/modifyInfo'),
      meta: {
        parentTitle: '信息管理',
        title: '修改信息',
        path: 'info/modifyInfo',
        permissions: true
      }
    }
  ]
}
