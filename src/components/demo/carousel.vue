<template>
  <div id="carousel">
    <div class="rolling">
      <div class="rollingicon rolling-left " @click="goLeft2">
        <i class="el-icon-arrow-left "></i>
      </div>
      <div class="swiper-container" id="homeSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide inner-box" v-for="item in recommendThemeList" :key="item.themeId">
            <span>{{ item.title }}</span>
            <img :src="item.cover" alt="" />
          </div>
        </div>
        <div class="swiper-button-prev1"></div>
        <div class="swiper-button-next1"></div>
      </div>
      <div class=" rollingicon rolling-right " @click="goRight2">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>
  </div>
</template>

<script type='text/javascript' src='src/assets/swiper2.7.6/idangerous.swiper.min.js'></script>
<script>
export default {
  data () {
    return {
      recommendThemeList: [
        { title: '111', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '111', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinrygyztemzsgeydqnsxnv4hsr3tlbmhiltkobtv6mrsgr4dcobqa.jpg' },
        { title: '111', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '111', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '111', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '111', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '111', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '111', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '111', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '111', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '111', cover: 'http://tu.chdesign.cn//Thumbnail/upload/match/20210823/g43timbqgbrdcyjygaztinzsgjrggoldgyztcyjyhfrtezbzmyzs42tqm5ptemrupaytqma.jpg' },
      ],
      swiperIndex: 0,
      swiper: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.getBanner()
      })
    },
    // 轮播图
    getBanner () {
      const homeSwiper = document.getElementById('homeSwiper')
      this.swiper = new Swiper(homeSwiper, {
        slidesPerView: 5,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next1',
          prevEl: '.swiper-button-prev1'
        }
      })
    },
    goLeft2 () {
      this.swiper.slidePrev()
      this.swiperIndex = this.swiper.activeIndex

    },
    goRight2 () {
      this.swiper.slideNext()
      this.swiperIndex = this.swiper.activeIndex
      console.log(this.swiper)
    }
  }
}
</script>
<style  lang="less" scoped>
.transform() {
  transform: scale(1.1, 1.1);
  -ms-transform: scale(1.1, 1.1); /* IE 9 */
  -moz-transform: scale(1.1, 1.1); /* Firefox */
  -webkit-transform: scale(1.1, 1.1); /* Safari 和 Chrome */
  -o-transform: scale(1.1, 1.2); /* Opera */
}
.transition(@p) {
  transition: all @p ease 0s;
  -moz-transition: all @p ease 0s;
  /* Firefox 4 */
  -webkit-transition: all @p ease 0s;
  /* Safari and Chrome */
  -o-transition: all @p ease 0s;
  /* Opera */
}
.swiper-container {
  width: 1200px;
  height: 182px;
  margin: 60px auto;
  .swiper-wrapper {
    position: relative;

    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }
  .swiper-slide {
    background: #eee;
    // width: 224px !important;
    // margin-left: 20px;
    cursor: pointer;
  }
  // .inner-box {
  //   float: left;
  //   position: relative;
  //   display: inline-block;
  //   width: 224px !important;
  //   height: 180px;
  //   margin-left: 20px;
  //   cursor: pointer;
  //   border-radius: 6px;
  //   overflow: hidden;
  //   span {
  //     position: absolute;
  //     bottom: 0px;
  //     // left: 10px;
  //     padding-left: 10px;
  //     color: #fff;
  //     font-size: 16px;
  //     font-weight: 500;

  //     z-index: 99;
  //     width: 224px;
  //     height: 96px;
  //     background: linear-gradient(
  //       180deg,
  //       rgba(255, 255, 255, 0) 0%,
  //       rgba(0, 0, 0, 0.5) 100%
  //     );
  //     border-radius: 0px 0px 10px 10px;
  //     line-height: 150px;
  //   }
  //   img {
  //     display: inline-block;
  //     width: 224px;
  //     height: 180px;
  //     .transition(0.5s);
  //   }
  //   &:hover {
  //     img {
  //       .transform;
  //     }
  //   }
  // }

  .swiper-slide:nth-child(1) {
    margin-left: 0 !important;
  }
}
.rolling {
  position: relative;
  width: 1200px;
  margin: 60px auto;
  .rollingicon {
    position: absolute;
    top: 80px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #000000;
    opacity: 0.2;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    color: #fff;
  }
  .rolling-left {
    left: -56px;
  }
  .rolling-right {
    right: -56px;
    transform: rotate(-180deg);
  }
  .rolling-content {
    position: relative;
    width: 1200px;
    height: 180px;
    overflow: hidden;
    #inner {
      position: absolute;
      top: 0;
      left: 0px;
      transition: all 0.3s;
      display: -webkit-box;
      display: flex;
      .inner-box {
        float: left;
        position: relative;
        display: inline-block;
        width: 224px !important;
        height: 180px;
        margin-left: 20px;
        cursor: pointer;
        border-radius: 6px;
        overflow: hidden;
        span {
          position: absolute;
          bottom: 0px;
          // left: 10px;
          padding-left: 10px;
          color: #fff;
          font-size: 16px;
          font-weight: 500;

          z-index: 99;
          width: 224px;
          height: 96px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(0, 0, 0, 0.5) 100%
          );
          border-radius: 0px 0px 10px 10px;
          line-height: 150px;
        }
        img {
          display: inline-block;
          width: 224px;
          height: 180px;
          .transition(0.5s);
        }
        &:hover {
          img {
            .transform;
          }
        }
      }
      .inner-box:nth-child(1) {
        margin-left: 0;
      }
    }
  }
}
</style>
