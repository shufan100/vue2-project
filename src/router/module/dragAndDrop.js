/*
 * @Author: shufan100 1549248097@qq.com
 * @Date: 2022-10-23 14:45:51
 * @LastEditors: shufan100 1549248097@qq.com
 * @LastEditTime: 2022-11-15 17:28:12
 * @FilePath: \vue2-project\src\router\module\dragAndDrop.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ChildLayout from '@/layout/childHome.vue'
export default {
  path: '/drag',
  name: 'drag',
  component: ChildLayout,
  // redirect: 'drag', // 默认显示第一个子路由、
  meta: { title: '拖拽组件' },
  children: [
    {
      path: 'dialog',
      name: 'dialog',
      component: () => import('@/components/page/dragAndDrop/dialog'),
      meta: {
        parentTitle: '拖拽组件',
        title: '拖拽弹窗',
        path: 'dragAndDrop/dialog',
        permissions: true
      }
    },
    {
      path: 'dragList',
      name: 'dragList',
      component: () => import('@/components/page/dragAndDrop/dragList'),
      meta: {
        parentTitle: '拖拽组件',
        title: '拖拽列表',
        path: 'dragAndDrop/dragList',
        permissions: true
      }
    }
  ]
}
