<template>
  <div class="shareArea cflex">
    <p class="shareTitle">分享组件一：横向排列</p>
    <div class="bottom rflex">
      <span class="toTitle">分享到：</span>
      <ul class="shareUl rflex wflex">
        <li>
          <div class="item" @mouseover="showqrcode()" @mouseout="hideqrcode()">微信</div>
          <div class="qrcodeArea" v-show="qrcode.show">
            <p class="saoTitle">扫一扫</p>
            <div class="qrcode" id="qrCodeUrl"></div>
          </div>
        </li>
        <li>
          <div class="item" @click="shareToWeibo()">微博</div>
        </li>
        <li>
          <div class="item" @click="shareToQQ()">QQ</div>
        </li>
        <li>
          <div class="item" @click="shareToQQzone()">QQ空间</div>
        </li>

        <li>
          <div class="item" @click="shareToDouban()">豆瓣</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { shareUrl } from '@/utils/data/env'

export default {
  name: 'YanShare',
  data() {
    return {
      qrcode: {
        show: false
      },
      qrcodeObj: {
        text: shareUrl, // 要分享的网页路径
        width: 80,
        height: 80,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      }
    }
  },
  mounted() {
    console.log(QRCode, 'QRCode')
    this.creatQrCode()
  },
  methods: {
    showqrcode() {
      this.qrcode.show = true
    },
    hideqrcode() {
      this.qrcode.show = false
    },
    creatQrCode() {
      this.$nextTick(() => {
        new QRCode(document.getElementById('qrCodeUrl'), this.qrcodeObj)
      })
    },
    shareToQQ() {
      this.$emit('shareToQQ')
    },
    shareToQQzone() {
      this.$emit('shareToQQzone')
    },
    shareToWeibo() {
      this.$emit('shareToWeibo')
    },
    shareToDouban() {
      this.$emit('shareToDouban')
    }
  }
}
</script>

<style lang="less" scoped>
.shareArea {
  width: 340px;
  align-items: center;
  background: #fff;
  border-radius: 4px;
  .shareTitle {
    border-bottom: 1px solid #e8e8e8;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    font-size: 14px;
  }
  .bottom {
    align-items: center;
    padding: 20px 8px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .toTitle {
      font-size: 13px;
    }
    .shareUl {
      justify-content: space-between;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        cursor: pointer;
        .title {
          margin-bottom: 10px;
          font-size: 13px;
          color: #a9d86e;
        }
        .item {
          background: #eff2f7;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          .svg-icon {
            font-size: 24px;
          }
          .active {
            color: #ff6c60;
          }
        }
        .qrcodeArea {
          position: absolute;
          top: 50px;
          left: -30px;
          text-align: center;
          border: 1px solid #a9d86e;
          border-radius: 4px;
          padding: 10px;
          z-index: 99;
          background: #fff;
          .saoTitle {
            font-size: 14px;
            color: #a9d86e;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>
