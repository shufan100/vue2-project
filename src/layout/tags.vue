<template>
  <!-- 顶部选择标签 -->
  <div class="tags" v-if="showTags">
    <ul>
      <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
        <router-link :to="item.path" class="tags-li-title">
          <!-- {{item.title | filtersEditTitle(item)}} -->
          {{ $t(`i18n.${item.name}`) }}
        </router-link>
        <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tagsList: []
    }
  },
  computed: {
    showTags () {
      return this.tagsList.length > 0
    }
  },
  watch: {
    $route (newValue, oldValue) {
      this.setTags(newValue)
    }
  },
  filters: {
    filtersEditTitle (item) {
      const arr = item.split('/')
      return arr.length > 1 ? arr[arr.length - 1] : item
    }
  },
  created () {
    // 初始化设置首页标签
    this.setTags(this.$route)
    // 监听关闭当前页面的标签页
    this.$bus.$on('close_current_tags', () => {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i]
        if (item.path === this.$route.fullPath) {
          if (i < len - 1) {
            this.$router.push(this.tagsList[i + 1].path)
          } else if (i > 0) {
            this.$router.push(this.tagsList[i - 1].path)
          } else {
            this.$router.push('/')
          }
          this.tagsList.splice(i, 1)
          break
        }
      }
    })
  },
  mounted () { },
  methods: {
    isActive (path) {
      // console.log(this.$route.fullPath,'获取路由path')
      return path === this.$route.fullPath
    },

    // 设置标签
    setTags (route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath
      })
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift()
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.name
        })
      }
      this.$bus.$emit('tags', this.tagsList)
    },
    // 关闭单个标签
    closeTags (index) {
      const delItem = this.tagsList.splice(index, 1)[0]
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1]
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path)
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tags {
  overflow: hidden;
  margin-left: 3px;
  border-top: 2px solid #f0f2f5;
  background: #fff;
  // padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active {
  border: 1px solid #ff6428;
  background-color: #ff6428;
}
.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
