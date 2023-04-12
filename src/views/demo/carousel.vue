<template>
  <div id="carousel">
    <h2>拖拽轮播</h2>
    <div class="rolling">
      <div v-if="swiperIndex>0" class="rollingicon rolling-left " @click="goLeft2">
        <i class="el-icon-arrow-left "></i>
      </div>
      <div class="swiper-container" id="homeSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide inner-box" v-for="(item,index) in recommendThemeList" :key="index">
            <span>{{ index+1 }}</span>
            <img :src="item.cover" alt="" />
          </div>
        </div>
        <div class="swiper-button-prev1"></div>
        <div class="swiper-button-next1"></div>
      </div>
      <div v-show="swiperIndex !=5" class=" rollingicon rolling-right " @click="goRight2">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>
    <!-- <h2>大图渐变/上拉滚动</h2> -->
    <div class="carousel-buttom-box">
      <el-card class="carousel-buttom-left box-card">
        <h2>大图渐变</h2>

        <div class="head-right">
          <div class="imgback"></div>
          <transition-group name="flip-list" tag="ul">
            <li v-for="item in currImgs" :key="item.id" class="list-item">
              <img :src="item.cover" />
            </li>
          </transition-group>
          <div class="box">
            <img :class="{ image: idx == index }" v-for="(item, idx) in effectImgList" :src="item.cover" :key="idx" @mouseenter="imgCilck(idx)" />
          </div>
        </div>

      </el-card>
      <!-- 上拉滚动 -->
      <el-card class="carousel-buttom-right box-card">
        <h2>上拉滚动</h2>
        <template v-if="continuousPatternList.length > 0">
          <div class="subitem" v-for="(item, index) in continuousPatternList" :key="item.artId">
            <div class="gallery-mian" @mouseenter="fourMouseenter(item, index)" @mouseleave="galleryTop = 0;">
              <div class="gallery" :ref="`gallery${index}`" :style="{ top: galleryIndexg == index ? galleryTop + 'px' : '0px' }">
                <div class="gallery-image">
                  <img :src="item.coverList[0]" />
                </div>
                <div class="gallery-description" :ref="`gallery-description${index}`">
                  <img :src="item.coverList[1]" />
                  <img :src="item.coverList[2]" />
                  <img :src="item.coverList[3]" />
                </div>
              </div>
            </div>
            <span class="title">{{ $wordlimit(item.title, 10) }}</span>
            <!-- <span class="title">{{item.title}}</span> -->
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script type='text/javascript' src='src/assets/swiper2.7.6/idangerous.swiper.min.js'></script>
<script>
export default {
  data () {
    return {
      // 轮播图
      recommendThemeList: [
        { title: '主题', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '111', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinrygyztemzsgeydqnsxnv4hsr3tlbmhiltkobtv6mrsgr4dcobqa.jpg' },
        { title: '试试', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20211130/ge3dgobsguzdknjygaztenbrha3tkltkobswoxzsgi2hqmrsgq.jpg' },
        { title: '测试', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/IywTu/creation/20211122/ge3dgnzvgyydsmzqge4dsnrzgq3toltkobswoxzsgi2hqmrsgq.jpg' },
        { title: '的观点', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '法', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '熊猫', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '伐', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/guzdmobtguydmmryha2tiusupjbgi4cknnyheltkobtv6mrsgr4dcobqa.jpg' },
        { title: '效力', cover: 'http://tu.chdesign.cn/test/Thumbnail/test/upload/theme/20180712/gm2tinjqg4ztonbwha3tm6culbcfi6snpblwultkobtv6mrsgr4dcobqa.jpg' },
        { title: '44', cover: 'http://tu.chdesign.cn//Thumbnail/upload/match/20210823/g43timbqgbrdcyjygaztinzsgjrggoldgyztcyjyhfrtezbzmyzs42tqm5ptemrupaytqma.jpg' },
      ],
      swiperIndex: 0,
      swiper: null,
      // 大图渐变
      currImgs: [{ id: 11, cover: require('@/assets/images/img1.jpg') }],
      timerIndex: null,
      index: 0,
      effectImgList: [
        { id: 11, cover: require('@/assets/images/img1.jpg') },
        { id: 22, cover: require('@/assets/images/img2.jpg') },
        { id: 33, cover: require('@/assets/images/img3.jpg') },
        { id: 44, cover: require('@/assets/images/img4.jpg') },
        { id: 55, cover: require('@/assets/images/img5.jpg') },
      ],
      // 滑动
      galleryTop: 0,
      galleryIndexg: null,
      continuousPatternList: [
        {
          artId: 101,
          title: '草莓草莓草莓草莓草莓草莓草莓草莓草莓草莓',
          coverList: [
            "http://tu.chdesign.cn/test/CUMS/OA/20210827/163005906216280690.jpeg",
            "http://tu.chdesign.cn/test/CUMS/OA/20210827/163005906452288141.jpeg",
            "http://tu.chdesign.cn/test/CUMS/OA/20210827/163006188506722264.png",
            "http://tu.chdesign.cn/test/CUMS/OA/20210827/163006190682495002.jpeg"
          ]
        },
        {
          artId: 202,
          title: '国际化的甘肃科技馆还是公司控股还是',
          coverList: [
            "http://tu.chdesign.cn/test/CUMS/OA/20210827/163004851125492535.png",
            "http://tu.chdesign.cn/test/CUMS/OA/20210827/163004860891614325.jpeg",
            "http://tu.chdesign.cn/test/CUMS/OA/20210827/163004861546939014.jpeg",
            "http://tu.chdesign.cn/test/CUMS/OA/20210827/163004862268124234.jpeg"
          ]
        },
        {
          artId: 303,
          title: '看几点开始加工时间大概是',
          coverList: [
            "http://tu.chdesign.cn/test/CUMS/OA/20210827/163004763662769875.png",
            "http://tu.chdesign.cn/test/CUMS/OA/20210827/163004765415627614.jpeg",
            "http://tu.chdesign.cn/test/CUMS/OA/20210827/163004766016044789.jpeg",
            "http://tu.chdesign.cn/test/CUMS/OA/20210827/163004766540264656.jpeg"
          ]
        },
      ],

    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.getBanner()
        this.startChange()
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
        },
        onTouchEnd: (swiper, event) => {
          setTimeout(() => {
            this.swiperIndex = swiper.activeIndex == -0 ? 0 : swiper.activeIndex
            console.log(swiper.activeIndex)
          }, 100)
        }
      })
    },
    goLeft2 () {
      this.swiper.slidePrev()
      this.swiperIndex = this.swiper.activeIndex
      console.log(this.swiperIndex)
    },
    goRight2 () {
      this.swiper.slideNext()
      this.swiperIndex = this.swiper.activeIndex
      console.log(this.swiperIndex)
    },
    // 大图渐变
    // hede > 大图渐变 > 小图点击
    imgCilck (num) {
      clearInterval(this.timerIndex)
      this.index = num
      this.startChange()
      this.currImgs.splice(0, 1, this.effectImgList[this.index])
    },
    // hede > 大图渐变 > 加载
    startChange () {
      var _this = this
      this.timerIndex = setInterval(function () {
        if (_this.index < _this.effectImgList.length - 1) {
          _this.index++
        } else {
          _this.index = 0
        }
        _this.currImgs.splice(0, 1, _this.effectImgList[_this.index])
      }, 4000)
    },
    // 四方连续鼠标移入
    fourMouseenter (item, index) {
      let galleryDescriptionHeight = this.$refs[`gallery-description${index}`][0].offsetHeight
      // console.log(galleryDescriptionHeight, this.$refs[`gallery${index}`][0], '00');
      this.galleryIndexg = index
      this.galleryTop = `-${galleryDescriptionHeight}`

      // this.threeShow = item.artId + item.title + index
    },
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
  -webkit-transition: all @p ease 0s;
  -o-transition: all @p ease 0s;
}
.transformScale(@p) {
  transform: scale(@p, @p);
  -ms-transform: scale(@p, @p); /* IE 9 */
  -moz-transform: scale(@p, @p); /* Firefox */
  -webkit-transform: scale(@p, @p); /* Safari 和 Chrome */
  -o-transform: scale(@p, @p+0.1); /* Opera */
}
.flex-direction(@p) {
  -ms-flex-direction: @p;
  -webkit-box-direction: @p;
  flex-direction: @p;
}
#carousel {
  // ---------------------------------------------
  .swiper-container {
    width: 1200px;
    height: 182px;
    margin: 20px auto;
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
    .inner-box {
      float: left;
      position: relative;
      display: inline-block;
      width: 224px !important;
      height: 180px;
      // margin-left: 20px;
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

    .swiper-slide:nth-child(1) {
      margin-left: 0 !important;
    }
  }
  .rolling {
    position: relative;
    width: 1200px;
    margin: 0px auto;
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
}

// buttom
.carousel-buttom-box {
  display: flex;
  width: 100%;
  height: calc(100% - 260px);
  .carousel-buttom-left,
  .carousel-buttom-right {
    position: relative;
    flex: 1;
    z-index: 9;
    .head-right {
      position: absolute;
      right: 100px;
      top: 50px;
      .imgback {
        position: absolute;
        top: 0;
        right: 75px;
        width: 365px;
        height: 365px;
        border-radius: 6px;
        background: #fff;
      }
      .flip-list-enter-active,
      .flip-list-leave-active {
        transition: all 0.5s;
      }
      .flip-list-enter,
      .flip-list-leave-active {
        opacity: 0.3;
      }
      .list-item {
        position: absolute;
        top: 0;
        right: 0;
        width: 365px;
        height: 365px;
        div {
          width: 100%;
          height: 100%;
          background: #fff;
        }
        img {
          position: absolute;
          right: 75px;
          width: 365px;
          height: 365px;
          border-radius: 6px;
        }
      }
      ul,
      ol {
        list-style: none;
      }
      .box {
        position: absolute;
        top: 0;
        right: 0;
        img {
          display: block;
          width: 65px;
          height: 65px;
          margin-bottom: 10px;
          border-radius: 6px;
          opacity: 0.7;
          cursor: pointer;
        }
        .image {
          display: block;
          opacity: 1;
        }
      }
    }
  }
}

.subitem {
  vertical-align: top;
  overflow: hidden;
  display: inline-block;
  position: relative;
  width: 224px;
  color: #222222;
  border-radius: 6px;
  background: white;
  img {
    display: block;
  }
  .title {
    //标题
    display: block;
    font-size: 16px;
    font-weight: 400;
    margin-top: 10px;
    color: #222;
  }
  // 四方连续 > 滑动效果样式
  .gallery-mian {
    width: 224px;
    height: 400px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 6px;
    .gallery {
      position: relative;
      top: 0;
      display: inline-block;
      width: 224px;
      transition: all 1.8s;
      .gallery-image {
        width: 100%;
        height: 400px;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 6px;
          object-fit: cover;
        }
      }

      .gallery-description {
        height: 100%;
        img {
          display: block;
          width: 224px;
        }
      }
    }
  }
  &:not(:nth-child(3n + 1)) {
    //不是3的倍数
    margin-right: 20px;
  }
}
</style>
