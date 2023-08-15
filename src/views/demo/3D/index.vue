<template>
  <div>
    <el-button @click="messageClick">防重复提示</el-button>
    <el-button @click="messageClick2">默认提示</el-button>

    <div class="color">
      <div> 1.material
        <material-picker v-model="colors" />
      </div>
      <div> 2.compact
        <compact-picker v-model="colors" />
      </div>
      <div> 3.swatches
        <swatches-picker v-model="colors" />
      </div>
      <div> 4.slider
        <slider-picker v-model="colors" />
      </div>
      <div> 5.sketch
        <sketch-picker v-model="colors" />
      </div>
      <div> 6.chrome
        <chrome-picker v-model="colors" />
      </div>
      <div> 7.photoshop
        <photoshop-picker v-model="colors" />
      </div>
      <div> 8.twitter
        <twitter-picker v-model="colors" />
      </div>
      <div> 9.grayscale
        <grayscale-picker v-model="colors" />
      </div>
    </div>

  </div>
</template>
<script>
import { Material, Compact, Swatches, Slider, Photoshop, Chrome, Sketch, Twitter, Grayscale } from 'vue-color'

export default {
  name: '',
  components: {
    'material-picker': Material,
    'compact-picker': Compact,
    'swatches-picker': Swatches,
    'slider-picker': Slider,
    'photoshop-picker': Photoshop,
    'chrome-picker': Chrome,
    'sketch-picker': Sketch,
    'twitter-picker': Twitter,
    'grayscale-picker': Grayscale
  },

  data() {
    return {
      colors: {
        color: '',
        hex: '#194d33',
        hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
        rgba: { r: 25, g: 77, b: 51, a: 1 },
        a: 1
      }
    }
  },
  mounted() { },
  methods: {
    messageClick() {
      this.$newMessage({
        type: 'success',
        message: '0000'
      })
    },
    messageClick2() {
      this.$message.warning('0000')
    }
  }
}
</script>
<style lang="less" scoped>
.color {
  display: flex;
  flex-wrap: wrap;
  text-align: center;

  div {
    margin: 20px;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid #eee;
    padding: 10px;
  }
}
</style>
