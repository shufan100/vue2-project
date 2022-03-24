<template>
  <div id="video-box">
    <div class="native">
      <!-- controls -->
      <video id="videos" width="500px" height="280px" autoplay :controls='iscontrols' name="media" @mouseenter='iscontrols=true' @mouseleave='iscontrols=false'>
        <source src="http://tu.chdesign.cn/test/CUMS/OA/20210716/1626429827078951.mp4" type="video/mp4">
      </video>
      <div v-if="!isPlay" class="native-mask" >
        <img  :src="require('@/assets/videos/play.png')" @click="play">
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      iscontrols: false,
      isPlay: false
    }
  },
  methods: {
    play () {
      const myVideo = document.getElementById('videos')
      console.log(myVideo.paused)
      this.isPlay = myVideo.paused
      if (myVideo.paused) {
        myVideo.play()
      } else {
        myVideo.pause()
      }
    }
  }
}
</script>
<style lang="less" scoped>
#video-box{
  .native {
    position: relative;
    width: 500px;
    height: 300px;
    .native-mask {
      position: absolute;
      top: 10px;
      width: 500px;
      height: 290px;
      background: #000000;
      opacity: 0.39;
      img{
        display: block;
        width: 72px;
        height: 72px;
        margin: 100px auto 0;
        cursor: pointer;
      }
    }
  }
}
</style>
