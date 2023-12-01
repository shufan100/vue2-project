/*
 * @Author: shufan100 1549248097@qq.com
 * @Date: 2022-11-15 15:54:13
 * @LastEditors: shufan100 1549248097@qq.com
 * @LastEditTime: 2022-11-15 15:58:30
 * @FilePath: \vue2-project\src\router\module\newFrom.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ChildLayout from '@/layout/childHome.vue'
export default {
  path: '/form',
  name: 'form',
  component: ChildLayout,
  // redirect: 'form1', // 默认显示第一个子路由、
  meta: { title: '表单模块' },
  children: [
    {
      path: 'form1',
      name: 'form1',
      component: () => import('@/views/newFrom/form'),
      meta: { parentTitle: '表单', title: 'Form表单', permissions: true },
    },
    {
      path: 'table',
      name: 'table',
      component: () => import('@/views/newFrom/table'),
      meta: {
        parentTitle: '表单',
        title: '基础表格',
        path: 'form/table',
        permissions: true,
      },
    },
    {
      path: 'editor',
      name: 'editor',
      component: () => import('@/views/newFrom/vueEditor'),
      meta: {
        parentTitle: '表单',
        title: '富文本编辑器',
        path: 'form/editor',
        permissions: true,
      },
    },
    {
      path: 'tinymce',
      name: 'tinymce',
      component: () => import('@/views/newFrom/tinymceEditor'),
      meta: {
        parentTitle: '表单',
        title: 'tinymce编辑器',
        path: 'form/tinymce',
        permissions: true,
      },
    },
    {
      path: 'ckEditor',
      name: 'ckEditor',
      component: () => import('@/views/newFrom/ckEditor'),
      meta: {
        parentTitle: '表单',
        title: 'CKEditor编辑器',
        path: 'form/ckEditor',
        permissions: true,
      },
    },
    {
      path: 'markdown',
      name: 'markdown',
      component: () => import('@/views/newFrom/markdown'),
      meta: {
        parentTitle: '表单',
        title: 'Markdown编辑器',
        path: 'form/markdown',
        permissions: true,
      },
    },

    {
      path: 'nativeTable',
      name: 'nativeTable',
      component: () => import('@/views/newFrom/nativeTable'),
      meta: {
        parentTitle: '表单',
        title: '原生表格',
        path: 'form/nativeTable',
        permissions: true,
      },
    },
  ],
}
