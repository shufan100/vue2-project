<template>
  <div class="breadcrumb">
    <i class="breadcrumb_i" :class="sidebarOpened?'el-icon-s-unfold':'el-icon-s-fold'" @click="isOpened"></i>
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item v-for="(name,index) in matchedArr" :key="index">{{name}}</el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="(name,index) in matchedArr" :key="index">{{$t(`i18n.${name}`) }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {

    };
  },
  computed: {
    matchedArr() {
      let temp = [],
        temps = [];
      this.$route.matched.filter((item, index, self) => {
        // if (item.meta.title) {
        //     const titleArr = item.meta.title.split("/");
        //     temp.push(...titleArr);
        // }
        if (item.meta.path) {
          const titleArr = [item.meta.path.split("/")[0], item.name];
          temp.push(...titleArr);
        }

      });
      // temp.filter((item, index, self) => {
      //     if (!temps.includes(item)) {
      //         temps.push(item);
      //     }
      // });
      // console.log(temps, "12121");
      return temp;
    },
    ...mapState(["sidebarOpened"])
  },
  watch: {
    $route() {
      console.log(this.$route.matched)
    },
  },
  mounted() {
    // console.log(this.matchedArr, "matchedArr");

  },
  methods: {
    ...mapActions(['sidebarOpenedAction', 'sidebarWidthAction']),
    isOpened() {
      let bol = !this.sidebarOpened;
      this.sidebarOpenedAction(bol);
    }
  }
};
</script>
<style lang="less" scoped>
.breadcrumb {
  margin: 10px 0px 10px 10px;
  background: #eaebec;
  .breadcrumb_i {
    float: left;
    margin-right: 5px;
    color: #606266;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>