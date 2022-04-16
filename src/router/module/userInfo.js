const userInfoRouter = [
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/components/page/infoShow'),
    meta: {
      parentTitle: '信息管理',
      title: '个人信息',
      path: 'info/userInfo',
      permissions: true,
    },
  },
  {
    path: '/modifyInfo',
    name: 'modifyInfo',
    component: () => import('@/components/page/modifyInfo'),
    meta: {
      parentTitle: '信息管理',
      title: '修改信息',
      path: 'info/modifyInfo',
      permissions: true,
    },
  },
];
export default userInfoRouter;
