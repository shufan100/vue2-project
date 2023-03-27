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
  path: '/permissions',
  name: 'permissions',
  component: ChildLayout,
  meta: { title: '权限设置' },
  children: [
    // 权限管理
    {
      path: 'pagePermissions',
      name: 'pagePermissions',
      component: () => import('@/components/permissions/pagePermissions'),
      meta: {
        parentTitle: '权限管理',
        title: '页面权限',
        path: 'permissions/pagePermissions',
        permissions: true
      }
    },
    {
      path: 'btnPermissions',
      name: 'btnPermissions',
      component: () => import('@/components/permissions/btnPermissions'),
      meta: {
        parentTitle: '权限管理',
        title: '按钮权限',
        path: 'permissions/btnPermissions',
        permissions: true
      }
    }
  ]
}
