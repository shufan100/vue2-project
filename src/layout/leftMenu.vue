<template>
  <div class="menu_left cflex">
    <div class="menu_page_top rflex">
      <img :class="['logo', { closeLogo: sidebarOpened }]" :src="logo" alt="小爱admin" />
      <span class="title" v-show="!sidebarOpened">
        {{ $t(`i18n.userName`) }}
        <i>Admin</i>
      </span>
    </div>
    <div class="menu_page_bottom is-scroll-left wflex">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="onRoutes"
        active-text-color="#ff6428"
        @select="handleOpen"
        @close="handleClose"
        :collapse="sidebarOpened"
        router
      >
        <template v-for="(item, index) in items">
          <!-- 1、判断一级菜单是否有子级 -->
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="index">
              <!-- 一级菜单（有子级标题） -->
              <template slot="title">
                <!-- <i :class="[item.icon, 'iconfont']"></i> -->
                <i :class="[item.icon]"></i>
                <!-- <span slot="title">{{item.title}}</span> -->
                <span>{{ $t(`i18n.${item.index.replace('/', '')}`) }}</span>
              </template>

              <!-- 二级菜单（循环） -->
              <template v-for="(subItem, index) in item.subs">
                <!-- 2、判断二级菜单是否有子级 -->
                <el-submenu v-if="subItem.subs" :index="item.index + subItem.index" :key="index">
                  <!-- 二级菜单（有子级标题） -->
                  <!-- <template slot="title">{{ subItem.title }}</template> -->
                  <template slot="title">{{ $t(`i18n.${subItem.index.replace('/', '')}`) }}</template>
                  <!-- <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index" >{{ threeItem.title }}</el-menu-item> -->
                  <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{
                    $t(`i18n.${threeItem.title.replace('/', '')}`)
                  }}</el-menu-item>
                </el-submenu>

                <!-- 二级菜单 -->
                <!-- <el-menu-item v-else :index="subItem.index" :key="subItem.index" >{{ subItem.title }}</el-menu-item> -->
                <el-menu-item v-else :index="item.index + subItem.index" :key="subItem.index">{{ $t(`i18n.${subItem.index.replace('/', '')}`) }}</el-menu-item>
              </template>
            </el-submenu>
          </template>

          <template v-else>
            <!-- 一级菜单 -->
            <el-menu-item :index="item.index" :key="index">
              <template slot="title">
                <!-- <i :class="[item.icon, 'iconfont']"></i> -->
                <i :class="[item.icon]"></i>
                <!-- <span slot="title">{{item.title}}</span> -->
                <span>{{ $t(`i18n.${item.index.replace('/', '')}`) }}</span>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import logoImg from '@/assets/images/logo.png'
export default {
  data() {
    return {
      logo: logoImg,
      opened: true,
      // 路由前加 / 可防止动态路由问题
      items: [
        {
          icon: 'el-icon-s-platform',
          index: '/home',
          title: '首页',
        },
        {
          icon: 'el-icon-s-order',
          index: '/form',
          title: '表单',
          subs: [
            {
              index: '/form1',
              title: 'Form表单',
            },
            {
              index: '/table',
              title: '基础表格',
            },
            {
              icon: 'el-icon-lx-cascades',
              index: '/editor',
              title: '富文本编辑器',
            },
            {
              icon: 'el-icon-lx-cascades',
              index: '/tinymce',
              title: 'tinymce编辑器',
            },
            {
              icon: 'el-icon-lx-cascades',
              index: '/ckEditor',
              title: 'ckEditor编辑器',
            },
            {
              icon: 'el-icon-lx-cascades',
              index: '/markdown',
              title: 'Markdown编辑器',
            },
            {
              icon: 'el-icon-lx-cascades',
              index: '/nativeTable',
              title: '原生表格',
            },
          ],
        },
        {
          icon: 'el-icon-s-comment',
          index: '/info',
          title: '信息管理',
          subs: [
            {
              index: '/userInfo',
              title: '个人信息',
            },
            {
              index: '/modifyInfo',
              title: '修改信息',
            },
          ],
        },
        {
          icon: 'el-icon-bell',
          index: '/msgCenter',
          title: '消息中心',
        },
        {
          icon: 'el-icon-share',
          index: '/share',
          title: '分享功能',
        },
        {
          icon: 'el-icon-menu',
          index: '/demo',
          title: '案例',
          subs: [
            {
              index: '/writing',
              title: '基础写法',
            },
            {
              index: '/shopping',
              title: '购物车',
            },
            {
              index: '/magnifying',
              title: '放大镜',
            },
            {
              index: '/threeD',
              title: '3D旋转图',
            },
            {
              index: '/upload',
              title: '图片上传',
            },
            {
              index: '/printer',
              title: '打印机',
            },
            {
              index: '/exportPdf',
              title: '导出PDF',
            },
            {
              index: '/iconfont',
              title: '矢量图标',
            },
            {
              index: '/carousel',
              title: '轮播图',
            },
            {
              index: '/antiShake',
              title: '自定义指令',
            },
            {
              index: '/seamless',
              title: '无缝滚动',
            },
            {
              index: '/video',
              title: '视频播放',
            },
            {
              index: '/slots',
              title: '插槽',
            },
            {
              index: '/navAnchor',
              title: '导航锚点',
            },
          ],
        },
        {
          icon: 'el-icon-s-tools',
          index: '/drag',
          title: '拖拽组件',
          subs: [
            {
              index: '/dialog',
              title: '拖拽弹窗',
            },
            {
              index: '/dragList',
              title: '拖拽列表',
            },
            {
              index: '/dragList2',
              title: '原生拖拽列表',
            },
          ],
        },
        {
          icon: 'el-icon-s-promotion',
          index: '/map',
          title: '地图组件',
          subs: [
            {
              index: '/echartsMap',
              title: '高德地图',
            },
          ],
        },
        {
          icon: 'el-icon-s-goods',
          index: '/permissions',
          title: '权限设置',
          subs: [
            {
              index: '/pagePermissions',
              title: '页面权限',
            },
            {
              index: '/btnPermissions',
              title: '按钮权限',
            },
          ],
        },
        {
          icon: 'el-icon-error',
          index: 'errorPage',
          title: '错误页面',
          subs: [
            {
              index: '/404',
              title: '404',
            },
          ],
        },
      ],
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    },
    ...mapState(['sidebarOpened', 'sidebarWidth']),
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
}
</script>
<style lang="less" scoped>
.menu_left {
  // min-width: 60px;
  // max-width: 200px;
  // position: absolute;
  // top: 0;
  // left: 0;
  // bottom: 0;
  .menu_page_top {
    width: 100%;
    height: 60px;
    align-items: center;
    justify-content: space-around;
    text-transform: uppercase;
    box-sizing: border-box;
    box-shadow: 0px 2px 5px 0px rgba(230, 224, 224, 0.5);

    .logo {
      height: 36px;
      width: 36px;
      vertical-align: middle;
      display: inline-block;
    }

    .closeLogo {
      width: 30px;
      height: 30px;
    }

    .title {
      font-size: 22px;

      i {
        color: #ff6c60;
      }
    }
  }

  .menu_page_bottom {
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-top: 3px;
    z-index: 10;
    box-shadow: 0 0 10px 0 rgba(230, 224, 224, 0.5);
  }

  .iconfont {
    font-size: 18px;
    padding-right: 6px;
  }

  .icon-xinxitishi,
  .icon-anli,
  .icon-yidong_huaban,
  .icon-ditu,
  .icon-quanxian {
    font-size: 22px;
  }
}
</style>

<style lang="less">
/* 菜单选中背景 */
.el-menu--inline .is-active {
  background: #000 !important;
}
</style>
