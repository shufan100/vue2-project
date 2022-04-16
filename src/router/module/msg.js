const msgRouter = [
  {
    path: '/msgCenter',
    name: 'msgCenter',
    component: () => import('@/components/page/msgCenter'),
    meta: { title: '消息中心', path: 'msgCenter', permissions: true },
  },
  {
    path: '/share',
    name: 'share',
    component: () => import('@/components/page/share'),
    meta: { title: '分享功能', path: 'share', permissions: true },
  },
];
export default msgRouter;
