const demoRouter = [
  {
    path: '/shopping',
    name: 'shopping',
    component: () => import('@/components/demo/shopping'),
    meta: {
      parentTitle: 'Demo',
      title: '购物车',
      path: 'demo/shopping',
      permissions: true
    }
  },
  {
    path: '/magnifying',
    name: 'magnifying',
    component: () => import('@/components/demo/magnifying'),
    meta: {
      parentTitle: 'Demo',
      title: '放大镜',
      path: 'demo/magnifying',
      permissions: true
    }
  },
  {
    path: '/threeD',
    name: 'threeD',
    component: () => import('@/components/demo/3D'),
    meta: {
      parentTitle: 'Demo',
      title: '3D旋转图',
      path: 'demo/3D',
      permissions: true
    }
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/components/demo/upload'),
    meta: {
      parentTitle: 'Demo',
      title: '文件上传',
      path: 'demo/upload',
      permissions: true
    }
  },
  {
    path: '/printer',
    name: 'printer',
    component: () => import('@/components/demo/printer'),
    meta: {
      parentTitle: 'Demo',
      title: '打印机',
      path: 'demo/printer',
      permissions: true
    }
  },
  {
    path: '/exportPdf',
    name: 'exportPdf',
    component: () => import('@/components/demo/exportPdf'),
    meta: {
      parentTitle: 'Demo',
      title: '导出PDF',
      path: 'demo/exportPdf',
      permissions: true
    }
  },
  {
    path: '/iconfont',
    name: 'iconfont',
    component: () => import('@/components/demo/iconfont'),
    meta: {
      parentTitle: 'Demo',
      title: '矢量图标',
      path: 'demo/iconfont',
      permissions: true
    }
  },
  {
    path: '/carousel',
    name: 'carousel',
    component: () => import('@/components/demo/carousel'),
    meta: {
      parentTitle: 'Carousel',
      title: '轮播图',
      path: 'demo/carousel',
      permissions: true
    }
  },
  {
    path: '/antiShake',
    name: 'antiShake',
    component: () => import('@/components/demo/antiShake'),
    meta: {
      parentTitle: 'AntiShake',
      title: '防抖指令',
      path: 'demo/antiShake',
      permissions: true
    }
  },
  {
    path: '/seamless',
    name: 'seamless',
    component: () => import('@/components/demo/seamless'),
    meta: {
      parentTitle: 'Seamless',
      title: '无缝滚动',
      path: 'demo/seamless',
      permissions: true
    }
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('@/components/demo/video'),
    meta: {
      parentTitle: 'Video',
      title: '视频播放',
      path: 'demo/video',
      permissions: true
    }
  },
  {
    path: '/slots',
    name: 'slots',
    component: () => import('@/components/demo/slots'),
    meta: {
      parentTitle: 'slots',
      title: '插槽',
      path: 'demo/slots',
      permissions: true
    }
  },
  {
    path: '/navAnchor',
    name: 'navAnchor',
    component: () => import('@/components/demo/navAnchor'),
    meta: {
      parentTitle: 'navAnchor',
      title: '导航锚点',
      path: 'demo/navAnchor',
      permissions: true
    }
  },
  {
    path: '/writing',
    name: 'writing',
    component: () => import('@/components/demo/writing'),
    meta: {
      parentTitle: 'writing',
      title: '基础写法',
      path: 'demo/writing',
      permissions: true
    },
    // 独享路由守卫（路由进入之前） 和 全局的前置路由守卫一样
    beforeEnter: (to, from, next) => {
      console.log('@@@ ~ beforeEnter')
      // ...
      !to.meta.permissions ? next('/403') : next()
    }
  }
]
export default demoRouter
