<template>
  <div>
    <div class="video-native">
      <video
        id="videos"
        width="892px"
        height="502px"
        muted
        :autoplay="false"
        :controls="iscontrols"
        @mouseenter="iscontrols = true"
        @mouseleave="iscontrols = false"
      >
        <source src="https://chdesign-static.oss-cn-hangzhou.aliyuncs.com/video/tuxinpnew.mp4" type="video/mp4" />
      </video>
      <div v-if="!isPlay" class="native-mask">
        <img class="native-mask-play" src="@/assets/images/play.png" @click="play" />
        <img class="native-mask-cover" src="@/assets/images/videoCover.png" />
        <span></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iscontrols: false,
      isPlay: false
    }
  },
  methods: {
    // 视频
    play() {
      const myVideo = document.getElementById('videos')
      this.isPlay = myVideo.paused
      console.log(myVideo.paused, 'myVideo.paused')
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
.video-native {
  position: relative;
  width: 892px;
  height: 502px;
  margin: auto;
  border-radius: 6px 0 0 6px;
  #videos {
    position: absolute;
    left: 0;
    border-radius: 10px;
  }
  .native-mask {
    position: absolute;
    top: 0px;
    width: 890px;
    height: 502px;
    background: rgba(0, 0, 0, 0.39);

    .native-mask-play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      width: 72px;
      height: 72px;
      cursor: pointer;
      z-index: 9;
    }
    .native-mask-cover {
      position: absolute;
      top: 0;
      width: 892px;
      height: 502px;
      cursor: pointer;
    }
    span {
      position: absolute;
      top: 0px;
      display: block;
      width: 892px;
      height: 502px;
      background: rgba(0, 0, 0, 0.39);
      border-radius: 6px;
    }
  }
}
</style>
