const fromRouter = [
  {
    path: '/form1',
    name: 'form1',
    component: () => import('@/components/page/form'),
    meta: { parentTitle: '表单', title: 'Form表单', permissions: true },
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('@/components/page/table'),
    meta: {
      parentTitle: '表单',
      title: '基础表格',
      path: 'form/table',
      permissions: true,
    },
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/components/page/vueEditor'),
    meta: {
      parentTitle: '表单',
      title: '富文本编辑器',
      path: 'form/editor',
      permissions: true,
    },
  },
  {
    path: '/markdown',
    name: 'markdown',
    component: () => import('@/components/page/markdown'),
    meta: {
      parentTitle: '表单',
      title: 'Markdown编辑器',
      path: 'form/markdown',
      permissions: true,
    },
  },
  {
    path: '/nativeTable',
    name: 'nativeTable',
    component: () => import('@/components/page/nativeTable'),
    meta: {
      parentTitle: '表单',
      title: '原生表格',
      path: 'form/nativeTable',
      permissions: true,
    },
  },
];
export default fromRouter;
