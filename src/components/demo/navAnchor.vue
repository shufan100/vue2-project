<template>
  <div id="deliverDetail">
    <div class="deliverDetail_nav" :class="{ nav_fixe: scrollTop > 60 }">
      <p v-for="(item, index) in navList" :key="index" @click="jump(index)" :class="navIndex == index ? 'navActive' : ''">{{ item }}</p>
    </div>
    <div ref="scroll-content" class="scroll-content" @scroll="scroll">
      <!-- 订单详情 -->
      <div class="deliverDetail_info">
        <ul>
          <li><span>订单编号</span>：bh123535563</li>
          <li><span>业务员</span>：解放军</li>
          <li><span>收货信息</span>：张三 联系电话：18860008000 福建省厦门市</li>
        </ul>
        <div class="deliverDetail_logistic">
          <h2>物流信息</h2>
          <div class="logistic_list" v-for="(item, index) in 1" :key="index">
            <p>
              <el-divider v-if="index > 0"></el-divider>
              <strong>
                <span>物流单号：{{ details.logisticNumber }}</span>
                <span>物流公司：{{ details.logisticType }}</span>
                <span>包裹总重：{{ details.weight }}</span>
                <span>发货时间：{{ details.shippingTime }}</span>
                <span>发货人：{{ details.shipper }}</span>
              </strong>
            </p>
          </div>
        </div>
      </div>

      <!-- 产品信息 -->
      <div class="deliverDetail_info">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="产品" min-width="180">
            <template slot-scope="scope">
              <div class="blurb">
                <img :src="scope.row.imageUrl" alt="" />
                <div>
                  <p>{{ scope.row.productName }}</p>
                  <p style="color: #999">SKU：{{ scope.row.skuCode }}</p>
                  <p style="color: #999">成品ID：{{ scope.row.layoutId }}</p>
                  <p>{{ scope.row.sku }}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderCode" label="销售订单编号"> </el-table-column>
          <el-table-column prop="num" label="数量"> </el-table-column>
          <el-table-column prop="price" label="单价(元)"> </el-table-column>
          <el-table-column prop="weight" label="单品重量KG)"> </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="多行输入"
                v-model="scope.row.remark"
                style="width: 100%"
                maxlength="100"
                @blur="remarkEdit(scope.row)"
              >
              </el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 补发/重寄记录 -->
      <div class="deliverDetail_info flex">
        <ul v-for="(item, index) in 2" :key="index">
          <li style="color: #2858f8"><strong>补发订单编号：</strong>fdds4555888565</li>
          <li><strong>责任方：</strong>张三</li>
          <li><strong>补发原因：</strong>损坏</li>
          <li><strong>处理时间：</strong>2024-12-06 19:12:45</li>
          <li><strong>处理人：</strong>客服</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DeliverDetail',
  data() {
    return {
      navIndex: 0,
      navList: ['订单详情', '产品信息', '补发记录'],
      details: {},
      tableData: [],
      addList: [],
      // 滚动条
      scrollTop: 0,
      activeStep: 0
    }
  },
  created() {
    this.getDetalis()
  },
  methods: {
    // 获取列表
    async getDetalis() {
      this.details = {}
      this.tableData = [
        { num: '111' },
        { num: '111' },
        { num: '111' },
        { num: '111' },
        { num: '111' },
        { num: '111' },
        { num: '111' },
        { num: '111' },
        { num: '111' },
        { num: '111' }
      ]
      this.addList = []
    },
    // 监听滚轮
    scroll(e) {
      const target = document.querySelector('.scroll-content')
      const scrollItems = document.querySelectorAll('.deliverDetail_info')
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
        const judge = e.target.scrollTop >= scrollItems[i].offsetTop - scrollItems[0].offsetTop
        console.log(judge)
        if (judge) {
          this.navIndex = i
          break
        }
      }
      // // 滚动条距离顶部的高度
      this.scrollTop = e.srcElement.scrollTop
      // 判断滚动条是否滚动到底部
      if (target.scrollHeight <= target.scrollTop + target.clientHeight) {
        this.navIndex = this.navList.length - 1
      }
    },
    // 点击切换锚点
    jump(index) {
      const target = document.querySelector('.scroll-content')
      const scrollItems = document.querySelectorAll('.deliverDetail_info')
      // 判断滚动条是否滚动到底部
      if (target.scrollHeight <= target.scrollTop + target.clientHeight) {
        this.navIndex = index
      }
      const total = scrollItems[index].offsetTop - scrollItems[0].offsetTop // 锚点元素距离其offsetParent(这里是body)顶部的距离(待滚动的距离)
      let distance = document.querySelector('.scroll-content').scrollTop // 滚动条距离滚动区域顶部的距离
      // let distance = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset // 滚动条距离滚动区域顶部的距离(滚动区域为窗口)
      // 滚动动画实现, 使用setTimeout的递归实现平滑滚动，将距离细分为50小段，10ms滚动一次
      // 计算每一小段的距离
      // debugger;
      let step = total / 50
      if (total > distance) {
        smoothDown(document.querySelector('.scroll-content'))
      } else {
        const newTotal = distance - total
        step = newTotal / 50
        smoothUp(document.querySelector('.scroll-content'))
      }

      // 参数element为滚动区域
      function smoothDown(element) {
        if (distance < total) {
          distance += step
          element.scrollTop = distance
          setTimeout(smoothDown.bind(this, element), 10)
        } else {
          element.scrollTop = total
        }
      }

      // 参数element为滚动区域
      function smoothUp(element) {
        if (distance > total) {
          distance -= step
          element.scrollTop = distance
          setTimeout(smoothUp.bind(this, element), 10)
        } else {
          element.scrollTop = total
        }
      }
    },
    // 修改商品备注
    remarkEdit(row) {
      console.log(row)
    },

    // 订单状态
    getStatus(data) {
      return data === 1 ? '已发货' : data === 2 ? '交易成功' : '已取消'
    }
  }
}
</script>
<style lang="less" scoped>
#deliverDetail {
  position: relative;
  background: #f7f8fa;
  overflow: hidden;
  .scroll-content {
    overflow-y: scroll;
    height: 100%;
  }
  header {
    font-size: 14px;
    color: #657097;
    margin-bottom: 24px;
    span {
      margin-right: 12px;
      font-size: 20px;
      font-weight: 600;
      color: #222222;
    }
  }
  .deliverDetail_nav {
    height: 60px;
    margin-bottom: 14px;
    background: #fff;
    z-index: 9;
    display: flex;
    p {
      border-top: 4px solid #fff;
      width: 140px;
      font-size: 16px;
      font-weight: 400;
      color: #657097;
      text-align: center;
      line-height: 56px;
      cursor: pointer;
    }
    .navActive {
      color: #2858f8;
      border-top-color: #2858f8;
      background: #fff;
      font-weight: 600;
    }
  }
  .nav_fixe {
    position: sticky;
    position: -webkit-sticky;
    top: 0px;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  }
  .deliverDetail_info {
    padding: 24px;
    margin-bottom: 14px;
    background: #fff;
    border-radius: 4px;
    ul {
      font-size: 14px;
      color: #222;
      span {
        display: inline-block;
        width: 56px;
        margin-bottom: 30px;
        text-align: justify;
        text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
        text-align-last: justify;
        color: #666;
      }
      p {
        display: inline-block;
        padding: 3px 7px;
        margin-left: 8px;
        color: #2858f8;
        background: #eef2fe;
        border-radius: 2px;
      }
      strong {
        display: inline-block;
        margin-bottom: 24px;
        font-weight: 400;
        color: #666;
      }
      li:nth-last-child(1) strong {
        margin: 0;
      }
    }
    .deliverDetail_logistic {
      h2 {
        margin-bottom: 20px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        span {
          color: #657097;
          font-size: 14px;
        }
      }
      .logistic_list {
        background: #f8fafb;
        p {
          height: 46px;
          padding: 0 24px;
          font-size: 14px;
          color: #657097;
          line-height: 46px;
          .el-divider--horizontal {
            margin: 0;
          }
        }
        strong {
          display: flex;
          justify-content: space-between;
          font-weight: 500 !important;
        }
      }
    }
    .blurb {
      display: flex;
      img {
        width: 76px;
        margin-right: 20px;
        height: 76px;
      }
      p {
        font-size: 14px;
        color: #222222;
        line-height: 20px;
      }
    }
  }

  footer {
    position: fixed;
    left: -24px;
    bottom: 0;
    width: calc(100% + 24px);
    height: 60px;
    padding-right: 120px;
    background: #ffffff;
    line-height: 60px;
    text-align: right;
    box-shadow: 9px -2px 8px 4px rgba(49, 97, 254, 0.05);
    .el-button:nth-last-child(1) {
      background: #2858f8;
      color: #fff;
      border-color: #2858f8;
    }
    .backBtn {
      background: #fff !important;
      color: #606266 !important;
      border-color: #dcdfe6 !important;
      &:hover {
        color: #2858f8 !important;
        border-color: #bfcdfd !important;
        background-color: #eaeefe !important;
      }
    }
  }
  .flex {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: flex-start;
    ul {
      float: left;
      margin-right: 184px;
      margin-bottom: 60px;
    }
  }
}
</style>
