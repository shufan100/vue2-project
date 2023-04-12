const msgRouter = [
  {
    path: '/msgCenter',
    name: 'msgCenter',
    component: () => import('@/views/msg/msgCenter'),
    meta: { title: '消息中心', path: 'msgCenter', permissions: true }
  },
  {
    path: '/share',
    name: 'share',
    component: () => import('@/views/msg/share'),
    meta: { title: '分享功能', path: 'share', permissions: true }
  }
]
export default msgRouter
