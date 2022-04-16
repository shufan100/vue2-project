const dragAndDropRouter = [
  {
    path: '/dialog',
    name: 'dialog',
    component: () => import('@/components/page/dragAndDrop/dialog'),
    meta: {
      parentTitle: '拖拽组件',
      title: '拖拽弹窗',
      path: 'dragAndDrop/dialog',
      permissions: true,
    },
  },
  {
    path: '/dragList',
    name: 'dragList',
    component: () => import('@/components/page/dragAndDrop/dragList'),
    meta: {
      parentTitle: '拖拽组件',
      title: '拖拽列表',
      path: 'dragAndDrop/dragList',
      permissions: true,
    },
  },
];
export default dragAndDropRouter;
