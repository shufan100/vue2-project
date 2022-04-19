<template>
  <div id="home">
    <ul class="home-left">
      <!-- <li class="home-left-box1"></li> -->
      <li class="home-left-box2">
        <div id="mapCharts" style="width: 100%;height:100%;"></div>
      </li>
      <li class="home-left-box3">
        <div class="left-box3-left">
          <div id="faultEchart1" style="width: 50%;height:100%;float:left"></div>
          <div id="faultEchart2" style="width: 50%;height:100%;float:left"></div>
        </div>
        <div class="left-box3-right">
          <div id="defectsPartsEchart" style="width: 100%;height:100%;"></div>
        </div>
      </li>
    </ul>

    <ul class="home-right">
      <li class="home-right-box1">
        <div id="oldEcharts" style="width: 100%;height:100%"></div>
      </li>
      <li class="home-right-box2">
        <div id="reliableEcharts" style="width: 100%;height:100%;"></div>
      </li>
      <li class="home-right-box3">
        <div id="stateEchart" style="width: 100%;height:100%"></div>
      </li>
    </ul>
    <!-- <VueQr text="Hello world!" :size="80"></VueQr>
        <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="srcList"></el-image-viewer>
        <el-button type="primary" size="small" @click="getPreview">图片预览</el-button>
        <el-button type="primary" size="small" @click="pdfShow=true">pdf预览</el-button>
        <div class="pdfs" v-if="pdfShow">
            <iframe class="iframe" :src="url"></iframe>
        </div>
        <i class="iconfont icondabiaoguanli"></i>
        <el-button v-preventReClick @click="antiShake">防抖多次触发</el-button>   -->
  </div>
</template>

<script>
import Watermark from '@/utils/watermark' // 路径不要写错
import VueQr from 'vue-qr'
import pinyin from 'js-pinyin'
import pdf from 'vue-pdf' // 在线预览pdf
import shanxi from '@/assets/json/sx.json'
import china from '@/assets/json/china.json'
export default {
  data () {
    return {
      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        require('@/assets/images/01.jpg'),
        require('@/assets/images/02.jpg')
      ],
      showViewer: false,
      guidePic:
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg', // 预览图片的地址
      pdfShow: false,
      mapData: [
        { name: '太原市', value: 100 },
        { name: '阳泉市', value: 2000 },
        { name: '大同市', value: 39990 },
        { name: '长治市', value: 4990 },
        { name: '晋中市', value: 53430 },
        { name: '临汾市', value: 75670 },
        { name: '运城市', value: 8660 },
        { name: '忻州市', value: 969670 },
        { name: '吕梁市', value: 9660 },
        { name: '朔州市', value: 76870 },
        { name: '晋城市', value: 966870 }
      ],
      mapData: [
        // 北京市、上海市、天津市、重庆市。
        // 黑龙江省、辽宁省、吉林省、河北省、河南省、湖北省、湖南省、山东省、山西省、陕西省、
        // 安徽省、浙江省、江苏省、福建省、广东省、海南省、四川省、云南省、贵州省、青海省、
        // 甘肃省、江西省、台湾省。
        // 内蒙古自治区、宁夏回族自治区、新疆维吾尔自治区、西藏自治区、广西壮族自治区?
        // 香港特别行政区、澳门特别行政区。
        { name: '北京市', value: 90000 },
        { name: '上海市', value: 100 },
        { name: '天津市', value: 70000 },
        { name: '重庆市', value: 100 },

        { name: '江西省', value: 100 },
        { name: '黑龙江省', value: 100 },
        { name: '辽宁省', value: 100 },
        { name: '吉林省', value: 100 },
        { name: '河南省', value: 100 },
        { name: '湖北省', value: 100 },
        { name: '湖南省', value: 100 },
        { name: '山东省', value: 100 },
        { name: '山西省', value: 100 },
        { name: '陕西省', value: 100 },
        { name: '安徽省', value: 100 },
        { name: '浙江省', value: 100 },
        { name: '江苏省', value: 100 },
        { name: '福建省', value: 100 },
        { name: '广东省', value: 100 },
        { name: '海南省', value: 100 },
        { name: '四川省', value: 100 },
        { name: '云南省', value: 100 },
        { name: '贵州省', value: 100 },
        { name: '青海省', value: 100 },
        { name: '甘肃省', value: 100 },
        { name: '台湾省', value: 100 },
        { name: '河北省', value: 28000 },

        { name: '内蒙古自治区', value: 100 },
        { name: '宁夏回族自治区', value: 100 },
        { name: '新疆维吾尔自治区', value: '100' },
        { name: '西藏自治区', value: 100 },
        { name: '广西壮族自治区', value: 100 },

        { name: '香港特别行政区', value: 100 },
        { name: '澳门特别行政区', value: 100 }
      ]
    }
  },
  components: {
    VueQr,
    pdf
  },
  mounted () {
    console.log('mixin:', this.mixinName)
    //         // Watermark.set("水印内容")
    // let name = "陈名勤";
    // let char = "";
    // pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
    // char = pinyin.getCamelChars(name);
    // console.log(char, "char");
    this.initMap()
    this.getInit()
    this.getInit2()
  },
  methods: {
    initMap () {
      this.$echarts.registerMap('shanxi', china)
      const myChart = this.$echarts.init(document.getElementById('mapCharts'))
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          // formatter: "{b}<br/>{c}",
          position: (point, params, dom, rect, size) => {
            params = {
              data: { total: 200, ques: 8, rate: 5, up: true, chagne: 2 }
            }
            // $(dom).html(`
            //             <div id="plan">
            //                 <span>台区数量: ${params.data.total}</span>
            //               <span>问题数: ${params.data.ques}</span>
            //                 <span>占比: ${params.data.rate}%</span>
            //                 <span class='${params.data.up ? 'active5' : ''
            //   }'>较上周: <i class="${params.data.up ? this.up : this.down
            //   }"></i>${params.data.chagne}%</span>
            //             </idv>
            //           `)
          }
        },
        visualMap: {
          min: 0,
          max: 100000,
          text: ['工单数', ''],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          },
          textStyle: {
            color: '#54afd9'
          },
          right: '10%',
          bottom: '5%',
          padding: [0, 0, 0, 0]
        },
        series: [
          {
            name: '中国',
            type: 'map',
            mapType: 'shanxi', // 自定义扩展图表类型
            zoom: 1.2,
            label: {
              show: true
            },
            data: this.mapData
          }
        ]
      })
      // 地图点击
      myChart.on('click', params => {
        console.log(params)
        this.$success('暂无问题数据')
      })
      // 故障统计1
      const faultEchart1 = this.$echarts.init(
        document.getElementById('faultEchart1')
      )
      faultEchart1.setOption({
        title: {
          text: '',
          textStyle: {
            fontWeight: 'normal',
            color: '#000',
            fontSize: 14
          }
        },
        tooltip: {
          top: 60,
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //   top:20,
        //   right:0,
        //   itemWidth:8,
        //   itemHeight:15,
        //   textStyle: {
        //       color: "#000"
        //   },
        //   data: ["外部", "人员","运行", "设备"]
        // },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '35%',
            center: ['50%', '50%'],
            data: [
              {
                value: 30,
                name: '外部',
                itemStyle: { normal: { color: '#00D9FB' } }
              },
              {
                value: 310,
                name: '人员',
                itemStyle: { normal: { color: '#FFFF00' } }
              },
              {
                value: 250,
                name: '运行',
                itemStyle: { normal: { color: '#E4007F' } }
              },
              {
                value: 180,
                name: '设备',
                itemStyle: { normal: { color: '#FEBE03' } }
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  color: '#000',
                  formatter: '{b} {d}% \n {c}'
                  // formatter: '{d}%'
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      })
      // 故障统计2
      const faultEchart2 = this.$echarts.init(
        document.getElementById('faultEchart2')
      )
      faultEchart2.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '35%',
            center: ['50%', '50%'],
            data: [
              {
                value: 100,
                name: '外部',
                itemStyle: { normal: { color: '#00D9FB' } }
              },
              {
                value: 50,
                name: '人员',
                itemStyle: { normal: { color: '#FFFF00' } }
              },
              {
                value: 380,
                name: '运行',
                itemStyle: { normal: { color: '#E4007F' } }
              },
              {
                value: 400,
                name: '设备',
                itemStyle: { normal: { color: '#FEBE03' } }
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  color: '#000',
                  formatter: '{b} {d}% \n {c}'
                  // formatter: '{d}%'
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      })
      const defectsPartsEchart = this.$echarts.init(
        document.getElementById('defectsPartsEchart')
      )
      defectsPartsEchart.setOption({
        title: {
          text: '单位：个',
          top: 30,
          left: 50,
          textStyle: {
            fontWeight: 'normal',
            color: '#ff6428',
            fontSize: 13
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            // 隐藏柱状图分割线
            show: false
          },
          axisTick: {
            show: false // 不显示刻度线
          },
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ff6428'
            }
          },
          axisLine: {
            show: false
          },
          splitLine: {
            // 隐藏柱状图分割线
            show: false
          },
          axisTick: {
            // 刻度
            show: false // 不显示刻度线
          },
          data: [
            '电缆通道',
            '附属设施',
            '电缆分支箱',
            '在线监测装置',
            '附属设备',
            '终端',
            '中间接头',
            '电缆段',
            '电缆'
          ]
        },
        series: [
          {
            type: 'bar',
            data: [900, 800, 700, 600, 500, 400, 300, 200, 100],
            itemStyle: {
              normal: { color: '#00F6FF' }
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                color: '#ff6428'
              }
            }
          }
        ]
      })
    },
    getInit () {
      const oldChart = this.$echarts.init(
        document.getElementById('oldEcharts')
      )
      oldChart.setOption({
        title: {
          text: '单位：KM',
          left: '10',
          top: '10',
          textStyle: {
            color: '#ff6428',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },

        legend: {
          data: ['新', '旧'],
          itemWidth: 10,
          itemHeight: 20,
          right: 0,
          orient: 'vertical',
          textStyle: {
            color: '#ff6428',
            fontSize: 12
          }
        },
        grid: {
          left: 30,
          bottom: 30
        },
        xAxis: {
          type: 'category',
          data: ['管道', '隧道', '电缆沟', '电缆桥'],
          axisLabel: {
            textStyle: {
              color: '#ff6428'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#002069',
              width: 1
            }
          },
          axisTick: {
            // 刻度
            show: false // 不显示刻度线
          }
        },
        yAxis: {
          type: 'value',
          max: 1.8,
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#ff6428'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#002069',
              width: 1
            }
          },
          axisTick: {
            // 刻度
            show: false // 不显示刻度线
          },
          splitLine: {
            // y轴分割线
            show: true,
            lineStyle: {
              color: '#002069',
              width: 1
            }
          }
        },
        series: [
          {
            name: '新',
            type: 'bar',
            barWidth: 15,
            data: [1.1, 0.2, 1.3, 0.4],
            itemStyle: {
              normal: { color: '#00F6FF' }
            }
          },
          {
            name: '旧',
            type: 'bar',
            data: [0.3, 0.4, 0.6, 1.1],
            barWidth: 15,
            itemStyle: {
              normal: { color: '#E4007F' }
            }
          }
        ]
      })
    },
    getInit2 () {
      const reliableEcharts = this.$echarts.init(
        document.getElementById('reliableEcharts')
      )
      reliableEcharts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '5%',
          top: 60,
          itemWidth: 8,
          itemHeight: 15,
          data: ['正常', '低风险', '高风险', '故障'],
          textStyle: {
            color: '#ff6428',
            fontSize: 12
          },
          formatter: function (name) {
            let index = 0
            const clientlabels = ['正常', '低风险', '高风险', '故障']
            const clientcounts = [435, 310, 234, 135]
            clientlabels.forEach(function (value, i) {
              if (value == name) {
                index = i
              }
            })
            return name + '  ' + clientcounts[index] + '个'
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: {
              // 显示数字
              normal: {
                show: true,
                position: 'top'
                // formatter: "{active|未处理}" + "\n\r" + "{total|" + 42 + "}",
                // rich: {
                //   active: {
                //     fontFamily: "微软雅黑",
                //     fontSize: 18,
                //     color: "#21d2d2",
                //     lineHeight: 50
                //   },
                //   total: {
                //     fontSize: 35,
                //     fontFamily: "微软雅黑",
                //     color: "#f5b301"
                //   }
                // }
              }
            },
            labelLine: {
              // 饼形不显示线
              normal: {
                show: false
              }
            },
            itemStyle: {
              // 显示百分比
              normal: {
                label: {
                  show: true,
                  // formatter: '{b} : {c} ({d}%)'
                  formatter: '{d}%'
                },
                labelLine: { show: false }
              }
            },
            data: [
              {
                value: 585,
                name: '正常',
                itemStyle: { normal: { color: '#00D9FB' } }
              },
              {
                value: 210,
                name: '低风险',
                itemStyle: { normal: { color: '#FFFF00' } }
              },
              {
                value: 234,
                name: '高风险',
                itemStyle: { normal: { color: '#FEBE03' } }
              },
              {
                value: 135,
                name: '故障',
                itemStyle: { normal: { color: '#FF0000' } }
              }
            ]
          }
        ]
      })

      const stateEchart = this.$echarts.init(
        document.getElementById('stateEchart')
      )
      stateEchart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: 50,
          right: 40,
          bottom: 30
        },
        legend: {
          top: 10,
          itemWidth: 8,
          itemHeight: 15,
          textStyle: {
            color: '#ff6428'
          },
          data: ['正常', '注意', '异常', '严重']
        },
        xAxis: {
          type: 'category',
          data: ['<1', '1-5', '5-10', '10-15', '20-30', '>30'],
          axisLabel: {
            textStyle: {
              color: '#ff6428'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#002069',
              width: 1
            }
          },
          axisTick: {
            // 刻度
            show: false // 不显示刻度线
          }
        },
        yAxis: [
          {
            name: '线路回数',
            type: 'value',
            max: 1000,
            nameTextStyle: {
              // y轴name
              color: '#ff6428'
              // fontSize:16,
              // padding:10
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#ff6428'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#002069',
                width: 1
              }
            },
            axisTick: {
              // 刻度
              show: false // 不显示刻度线
            },
            splitLine: {
              // y轴分割线
              show: true,
              lineStyle: {
                color: '#002069',
                width: 1
              }
            }
          },
          {
            name: '占比',
            min: 0,
            max: 100,
            interval: 20,
            nameTextStyle: {
              // y轴name
              color: '#ff6428'
              // fontSize:16,
              // padding:10
            },
            axisLabel: {
              formatter: '{value}%',
              textStyle: {
                color: '#ff6428'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#002069'
              }
            },
            axisTick: {
              // 刻度
              show: false // 不显示刻度线
            },
            splitLine: {
              // y轴分割线
              show: true,
              lineStyle: {
                color: '#002069',
                width: 1
              }
            }
          }
        ],
        series: [
          // 柱
          {
            name: '正常',
            type: 'bar',
            barWidth: 15,
            stack: '搜索引擎',
            data: [312, 254, 242, 178, 299, 104],
            itemStyle: {
              normal: { color: '#00F6FF' }
            }
          },
          {
            name: '注意',
            type: 'bar',
            barWidth: 15,
            stack: '搜索引擎',
            data: [212, 174, 282, 158, 159, 84],
            itemStyle: { normal: { color: '#FFFF00' } }
          },
          {
            name: '异常',
            type: 'bar',
            barWidth: 15,
            stack: '搜索引擎',
            data: [312, 224, 142, 78, 99, 74],
            itemStyle: { normal: { color: '#FEBE03' } }
          },
          {
            name: '严重',
            type: 'bar',
            barWidth: 15,
            stack: '搜索引擎',
            data: [112, 124, 142, 178, 59, 64],
            itemStyle: { normal: { color: '#DF0000' } }
          },
          // 线
          {
            // name: "正常1",
            type: 'line',
            yAxisIndex: 1,
            data: [90, 80, 85, 70, 40, 10],
            itemStyle: {
              normal: { color: '#00F6FF' }
            }
          },
          {
            // name: "注意1",
            type: 'line',
            yAxisIndex: 1,
            data: [70, 60, 70, 50, 70, 20],
            itemStyle: { normal: { color: '#FFFF00' } }
          },
          {
            // name: "异常1",
            type: 'line',
            yAxisIndex: 1,
            data: [30, 40, 50, 55, 30, 7],
            itemStyle: { normal: { color: '#FEBE03' } }
          },
          {
            // name: "严重1",
            type: 'line',
            yAxisIndex: 1,
            data: [20, 27, 40, 30, 20, 15],
            itemStyle: { normal: { color: '#DF0000' } }
          }
        ]
      })
    },

    closeViewer () {
      this.showViewer = false
    },
    getPreview () {
      this.guidePic
        ? (this.showViewer = true)
        : this.$message.info('当前没有可预览的图片')
    },
    pdfCheck () {
      this.$refs.pdf.print()
    },
    antiShake () {
      console.log('1秒触发一次！')
    }
  }
}
</script>
<style lang="less">
#home {
  height: 94%;
  overflow: hidden;
  display: flex;
  li {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    // background: #f9f9f9;
  }
  .home-left {
    flex: 5;
    margin-right: 10px;
    display: flex;
    flex-direction: column; //(row为水平方向，column为垂直方向)；
    .home-left-box1 {
      height: 60px;
      // background: red;
    }
    .home-left-box2 {
      flex: 5;
      margin: 10px 0;
      // background: yellow;
    }
    .home-left-box3 {
      flex: 2;
      display: flex;
      .left-box3-left {
        flex: 1;
        margin-right: 10px;
        // background: teal;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
      .left-box3-right {
        flex: 1;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        // background: salmon;
      }
    }
  }
  .home-right {
    flex: 2;
    display: flex;
    flex-direction: column; //(row为水平方向，column为垂直方向)；
    .home-right-box1 {
      flex: 1.5;
      // background: yellow;
    }
    .home-right-box2 {
      flex: 1.5;
      // background: red;
      margin-top: 10px;
    }
    .home-right-box3 {
      flex: 2;
      margin-top: 10px;
      // background: seagreen;
    }
  }
  #plan {
    width: 130px;
    height: 105px;
    padding: 10px;
    background: #fff;
    span {
      display: block;
      color: #33bdfd;
      font-size: 14px;
    }
    span:nth-child(2) {
      color: #ffbe40;
    }
    span:nth-child(3) {
      color: #28ffb6;
    }
    span:nth-child(4) {
      color: #1eff00;
    }
    .active5 {
      color: red !important;
    }
  }
}
// .pdfs{
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0, 0, 0, 0.1);
//     overflow: scroll;
//     z-index: 9999;
//     .pdf{
//         position: absolute !important;
//         top: 10px;
//         left: 50%;

//     }
// }
</style>
