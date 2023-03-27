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
  path: '/map',
  name: 'map',
  component: ChildLayout,
  meta: { title: '地图组件' },
  children: [
    // 高德地图
    {
      path: 'echartsMap',
      name: 'echartsMap',
      component: () => import('@/components/echarts/echartsMap'),
      meta: {
        parentTitle: '地图组件',
        title: '高德地图',
        path: 'map/echartsMap',
        permissions: true
      }
    }
  ]
}
