<!-- 放大镜 -->
<template>
  <div id="seamless">
    <div class="seamless-content">
      <vue-seamless-scroll :class-option="classOption" :data="tableList" class="warp">
        <div v-for="(item, index) in tableList" :key="index" :style="{ height: item.isLong ? '390px' : '240px' }">
          <img :src="item.src" alt />
        </div>
      </vue-seamless-scroll>
      <vue-seamless-scroll :class-option="classOption2" :data="tableList2" class="warp">
        <div v-for="(item, index) in tableList2" :key="index" :style="{ height: item.isLong ? '390px' : '240px' }">
          <img :src="item.src" alt />
        </div>
      </vue-seamless-scroll>
      <vue-seamless-scroll :class-option="classOption" :data="tableList" class="warp">
        <div v-for="(item, index) in tableList" :key="index" :style="{ height: item.isLong ? '390px' : '240px' }">
          <img :src="item.src" alt />
        </div>
      </vue-seamless-scroll>
      <vue-seamless-scroll :class-option="classOption2" :data="tableList2" class="warp">
        <div v-for="(item, index) in tableList2" :key="index" :style="{ height: item.isLong ? '390px' : '240px' }">
          <img :src="item.src" alt />
        </div>
      </vue-seamless-scroll>
      <vue-seamless-scroll :class-option="classOption" :data="tableList2" class="warp">
        <div v-for="(item, index) in tableList2" :key="index" :style="{ height: item.isLong ? '390px' : '240px' }">
          <img :src="item.src" alt />
        </div>
      </vue-seamless-scroll>
      <vue-seamless-scroll :class-option="classOption2" :data="tableList2" class="warp">
        <div v-for="(item, index) in tableList2" :key="index" :style="{ height: item.isLong ? '390px' : '240px' }">
          <img :src="item.src" alt />
        </div>
      </vue-seamless-scroll>
    </div>
  </div>
</template>
<script>
import vueSeamlessScroll from 'vue-seamless-scroll';
export default {
  components: {
    vueSeamlessScroll
  },
  data() {
    return {
      tableList: [
        { src: 'http://tu.chdesign.cn/test/CUMS/OA/20210827/163004654762456443.png', isLong: true },
        { src: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20210624/ge3denbvgmzdoojzhe3tcnzxgm4toltqnztv6mrygv4deobva.jpg', isLong: false },
        { src: 'http://tu.chdesign.cn/test/CUMS/OA/20210827/163004654762456443.png', isLong: true },
        { src: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20210624/ge3denbvgmzdoojzhe3tcnzxgm4toltqnztv6mrygv4deobva.jpg', isLong: false },
        { src: 'http://tu.chdesign.cn/test/CUMS/OA/20210827/163004654762456443.png', isLong: true },
        { src: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20211122/ge3dgnzvgyydsmzqge4dsnrzgq3toltkobswoxzsgi2hqmrsgq.jpg', isLong: false },
        { src: 'http://tu.chdesign.cn/test/CUMS/OA/20210827/163004654762456443.png', isLong: true },
        { src: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20210624/ge3denbvgmzdoojzhe3tcnzxgm4toltqnztv6mrygv4deobva.jpg', isLong: false },
        { src: 'http://tu.chdesign.cn/test/CUMS/OA/20210827/163004654762456443.png', isLong: true },
        { src: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20210624/ge3denbvgmzdoojzhe3tcnzxgm4toltqnztv6mrygv4deobva.jpg', isLong: false },
        { src: 'http://tu.chdesign.cn/test/CUMS/OA/20210827/163004654762456443.png', isLong: true },
        { src: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20211122/ge3dgnzvgyydsmzqge4dsnrzgq3toltkobswoxzsgi2hqmrsgq.jpg', isLong: false }
      ],
      tableList2: [
        { src: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20210624/ge3denbvgmzdoojzhe3tcnzxgm4toltqnztv6mrygv4deobva.jpg', isLong: false },
        { src: 'http://tu.chdesign.cn/test/CUMS/OA/20210827/163004654762456443.png', isLong: true },
        { src: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20210624/ge3denbvgmzdoojzhe3tcnzxgm4toltqnztv6mrygv4deobva.jpg', isLong: false },
        { src: 'http://tu.chdesign.cn/test/CUMS/OA/20210827/163004654762456443.png', isLong: true },
        { src: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20211122/ge3dgnzvgyydsmzqge4dsnrzgq3toltkobswoxzsgi2hqmrsgq.jpg', isLong: false },
        { src: 'http://tu.chdesign.cn/test/CUMS/OA/20210827/163004654762456443.png', isLong: true },
        { src: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20210624/ge3denbvgmzdoojzhe3tcnzxgm4toltqnztv6mrygv4deobva.jpg', isLong: false },
        { src: 'http://tu.chdesign.cn/test/CUMS/OA/20210827/163004654762456443.png', isLong: true },
        { src: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20210624/ge3denbvgmzdoojzhe3tcnzxgm4toltqnztv6mrygv4deobva.jpg', isLong: false },
        { src: 'http://tu.chdesign.cn/test/CUMS/OA/20210827/163004654762456443.png', isLong: true },
        { src: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20211122/ge3dgnzvgyydsmzqge4dsnrzgq3toltkobswoxzsgi2hqmrsgq.jpg', isLong: false },
        { src: 'http://tu.chdesign.cn/test/CUMS/OA/20210827/163004654762456443.png', isLong: true }
      ],
      classOption: {
        hoverStop: false, // 禁止鼠标悬停停止
        step: 0.2, // 滚动速度
        direction: 1 // 滚动方向,1向上、0向上
      },
      classOption2: {
        hoverStop: false, // 禁止鼠标悬停停止
        step: 0.2, // 滚动速度
        direction: 0 // 滚动方向,1向上、0向上
      },
      activeName: '授权',
      themeTitle: ''
    };
  },
  mounted() {},
  methods: {
    beforeTabLeave(newVal, oldVal) {
      if (newVal === '素材' && this.themeTitle) {
        this.$message.warning('主题作品不能发布至素材区');
        return false;
      }
    },
    handleClick(tab, event) {
      if (tab.name === '素材') {
        console.log(1111111111);
        // this.workData.buyOutPrice = ''
        // this.realBuyOutPrice = ''
        // this.workData.categoryPrice = ''
        // this.realCategoryPrice = ''
      }
    }
  }
};
</script>
<style lang="less" scoped>
#seamless {
  background: red;
  overflow: hidden;
  .seamless-content {
    width: 1920px;
    height: 1000px;
    // transform: rotate(-45deg);
    position: relative;
    top: 1px;
    left: 1px;
  }
  .warp {
    overflow: hidden;
    float: left;
    width: 240px;
    height: 1000px;
    margin-right: 20px;
    background: #f1f1f1;
    // transform:rotate(-45deg);

    div {
      display: block;
      width: 240px;
      height: 390px;
      margin-top: 20px;
      padding-right: 20px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
      // li:nth-child(1){
      //   margin-top: 0;
      // }
    }
  }

  // .drap {
  //   display: none; /*默认隐藏*/
  //   position: absolute;
  //   width: 100px;
  //   height: 100px;
  //   background: url('../../assets/images/tz_bg.png');
  //   cursor: move;
  // }
}
</style>
