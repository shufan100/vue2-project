 
<template>
    <div class="home">
        <i class="iconfont iconshenhe"></i>
        <i class="iconfont iconzhongzhi"></i>
        <h1>{{bol}}</h1>
        <h2>{{personType}}</h2>
        <el-button @click="btn">按钮</el-button>

        <div class="box1">
            <div v-for="(v,i) in leftData" :key="i" @click="add(v)">{{v.name}}</div>
        </div>
        <div class="box2">
            <div v-for="(v,i) in rightData" :key="i">{{v.name}}</div>
        </div>
        <div id="cxv" style="width:300px;height:300px"></div>
        <div id="maps" style="width:500px;height:500px"></div>
        路由写错跳404
        路由缓存，keep-alive只是隐藏路由
        
    </div>
</template>

<script>
require("echarts-liquidfill"); //引了这个插件
export default {
    data() {
        return {
            bol: true,
            name: "名字",
            obj: {
                a: "11"
            },
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                },
                {
                    value: "选项3",
                    label: "蚵仔煎"
                },
                {
                    value: "选项4",
                    label: "龙须面"
                },
                {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
            value: "1111",
            leftData: [
                { name: "北京", id: 1 },
                { name: "山海", id: 2 },
                { name: "深圳", id: 3 },
                { name: "厦门", id: 4 }
            ],
            rightData: [],
        };
    },
    // computed 计算属性
    computed: {
        personType() {
            return this.bol ? "正确" : "错误";
        }
    },
    // watch 监听器
    watch: {
        name(newN, oldN) {
            console.log(newN, oldN);
        },
        obj: {
            deep: false, //深度监听
            immediate: true, //刚进来先执行handler函数
            handler(newO, oldO) {
                //必须叫这个函数
                // 深度监听对象的时候，这个函数的两个参数都是新值
                console.log(newO, oldO, "111");
            }
        }
    },
    mounted() {

        //? 监听组件的 mounted 钩子函数
        this.$on("hook:mounted", () => {
            console.log("监听 mounted 生命周期触发");
        });

        let obj = {
            a: 1212,
            data() {
                consol.log(1111);
            }
        };
        let obj1 = {
            a: 32323,
            data: function() {
                consol.log(2222);
            }
        };
        console.log(obj, obj1);
        this.initss();
        this.initEcharts();
    },
    methods: {

        // 饼图动图
        initss() {
            let myChart = this.$echarts.init(document.getElementById("cxv"));
            myChart.setOption(
                {
                    series: [
                        {
                            type: "liquidFill",
                            radius: "85%",
                            center: ["50%", "45%"],
                            data: [0.78, 0.68, 0.48, 0.28],
                            backgroundStyle: {
                                color: {
                                    type: "linear",
                                    x: 1,
                                    y: 0,
                                    x2: 0.5,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 1,
                                            color: "rgba(68, 145, 253, 0.55)"
                                        },
                                        {
                                            offset: 0.5,
                                            color: "rgba(68, 145, 253, 0.65)"
                                        },
                                        {
                                            offset: 0,
                                            color: "rgba(68, 145, 253, 1)"
                                        }
                                    ],
                                    globalCoord: false
                                }
                            },
                            outline: {
                                borderDistance: 0,
                                itemStyle: {
                                    borderWidth: 5,
                                    borderColor: {
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: "rgba(53,142,215, 0)"
                                            },
                                            {
                                                offset: 0.5,
                                                color: "rgba(53,142,215, 0.45)"
                                            },
                                            {
                                                offset: 1,
                                                color: "rgba(53,142,215, 0.9)"
                                            }
                                        ],
                                        globalCoord: false
                                    },
                                    shadowBlur: 10,
                                    shadowColor: "rgba(53,142,215, 0.9)"
                                }
                            },
                            label: {
                                normal: {
                                    formatter: "9999" + "万",
                                    textStyle: {
                                        fontSize: 18
                                    }
                                }
                            }
                        }
                    ]
                },
                true
            );
        },

        // 地图
        initEcharts() {
            let myChart = this.$echarts.init(document.getElementById("maps"));

            const timeData = [2016, 2017, 2018, 2019, 2020];

            // if (parentInfo.value.length === 1) {
            //     echarts.registerMap("china", geoJson.value); //注册
            // } else {
            //     echarts.registerMap("map", geoJson.value); //注册
            // }
            var min = 198; //198
            var max = 2983; //2983

            myChart.setOption(
                {
                    timeline: {
                        data: timeData,
                        axisType: "category",
                        autoPlay: true,
                        playInterval: 8000,
                        left: "10%",
                        right: "10%",
                        bottom: "0%",
                        width: "80%",
                        label: {
                            normal: {
                                textStyle: {
                                    color: "rgb(179, 239, 255)"
                                }
                            },
                            emphasis: {
                                textStyle: {
                                    color: "#fff"
                                }
                            }
                        },
                        currentIndex: timeData.indexOf(2020),
                        symbolSize: 10,
                        lineStyle: {
                            color: "#8df4f4"
                        },
                        checkpointStyle: {
                            borderColor: "#8df4f4",
                            color: "#53D9FF",
                            borderWidth: 2
                        },
                        controlStyle: {
                            showNextBtn: true,
                            showPrevBtn: true,
                            normal: {
                                color: "#53D9FF",
                                borderColor: "#53D9FF"
                            },
                            emphasis: {
                                color: "rgb(58,115,192)",
                                borderColor: "rgb(58,115,192)"
                            }
                        }
                    },
                    baseOption: {
                        animation: true,
                        animationDuration: 900,
                        animationEasing: "cubicInOut",
                        animationDurationUpdate: 900,
                        animationEasingUpdate: "cubicInOut",

                        title: {
                            left: "center",
                            top: 0,
                            text: "2020" + "年" + "全国" + "销售额统计图",
                            textStyle: {
                                color: "rgb(179, 239, 255)",
                                fontSize: 16
                            }
                        },
                        tooltip: {
                            trigger: "item",
                            formatter: p => {
                                let val = p.value;
                                if (p.name == "南海诸岛") return;
                                if (window.isNaN(val)) {
                                    val = 0;
                                }
                                let txtCon =
                                    "<div style='text-align:left'>" +
                                    p.name +
                                    ":<br />销售额：" +
                                    val.toFixed(2) +
                                    "万</div>";
                                return txtCon;
                            }
                        },
                        toolbox: {
                            feature: {
                                restore: {
                                    show: false
                                },
                                dataView: {
                                    show: false
                                },
                                saveAsImage: {
                                    name: "销售额统计图"
                                },
                                dataZoom: {
                                    show: false
                                },
                                magicType: {
                                    show: false
                                }
                            },
                            iconStyle: {
                                normal: {
                                    borderColor: "#1990DA"
                                }
                            },
                            top: 0,
                            right: 0
                        },
                        visualMap: {
                            show: true,
                            min: min,
                            max: max,
                            left: "0%",
                            bottom: "0%",
                            calculable: true,
                            inRange: {
                                color: ["#24CFF4", "#2E98CA", "#1E62AC"]
                            },
                            textStyle: {
                                color: "#24CFF4"
                            }
                        },
                        series: [
                            {
                                name: "2020" + "销售额度",
                                type: "map",
                                map: "china",
                                roam: true,
                                zoom: 1.25,
                                tooltip: {
                                    trigger: "item",
                                    formatter: p => {
                                        let val = p.value;
                                        if (p.name == "南海诸岛") return;
                                        if (window.isNaN(val)) {
                                            val = 0;
                                        }
                                        let txtCon =
                                            "<div style='text-align:left'>" +
                                            p.name +
                                            ":<br />销售额：" +
                                            val.toFixed(2) +
                                            "万</div>";
                                        return txtCon;
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        color: "rgb(249, 249, 249)", //省份标签字体颜色
                                        formatter: p => {
                                            switch (p.name) {
                                                case "内蒙古自治区":
                                                    p.name = "内蒙古";
                                                    break;
                                                case "西藏自治区":
                                                    p.name = "西藏";
                                                    break;
                                                case "新疆维吾尔自治区":
                                                    p.name = "新疆";
                                                    break;
                                                case "宁夏回族自治区":
                                                    p.name = "宁夏";
                                                    break;
                                                case "广西壮族自治区":
                                                    p.name = "广西";
                                                    break;
                                                case "香港特别行政区":
                                                    p.name = "香港";
                                                    break;
                                                case "澳门特别行政区":
                                                    p.name = "澳门";
                                                    break;
                                                default:
                                                    break;
                                            }
                                            return p.name;
                                        }
                                    },
                                    emphasis: {
                                        show: true,
                                        color: "#f75a00"
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        areaColor: "#24CFF4",
                                        borderColor: "#53D9FF",
                                        borderWidth: 1.3,
                                        shadowBlur: 15,
                                        shadowColor: "rgb(58,115,192)",
                                        shadowOffsetX: 7,
                                        shadowOffsetY: 6
                                    },
                                    emphasis: {
                                        areaColor: "#8dd7fc",
                                        borderWidth: 1.6,
                                        shadowBlur: 25
                                    }
                                },
                                data: [
                                            {
                                                citycode: [],
                                                adcode: "410000",
                                                name: "河南省",
                                                center: "113.665412,34.757975",
                                                level: "province",
                                                districts: [],
                                                value:10,
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "440000",
                                                name: "广东省",
                                                center: "113.280637,23.125178",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "150000",
                                                name: "内蒙古自治区",
                                                center: "111.670801,40.818311",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "230000",
                                                name: "黑龙江省",
                                                center: "126.642464,45.756967",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "650000",
                                                name: "新疆维吾尔自治区",
                                                center: "87.617733,43.792818",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "420000",
                                                name: "湖北省",
                                                center: "114.298572,30.584355",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "210000",
                                                name: "辽宁省",
                                                center: "123.429096,41.796767",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "370000",
                                                name: "山东省",
                                                center: "117.000923,36.675807",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                citycode: [],
                                                adcode: "610000",
                                                name: "陕西省",
                                                center: "108.948024,34.263161",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: "021",
                                                adcode: "310000",
                                                name: "上海市",
                                                center: "121.472644,31.231706",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "520000",
                                                name: "贵州省",
                                                center: "106.713478,26.578343",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: "023",
                                                adcode: "500000",
                                                name: "重庆市",
                                                center: "106.504962,29.533155",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "540000",
                                                name: "西藏自治区",
                                                center: "91.132212,29.660361",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "340000",
                                                name: "安徽省",
                                                center: "117.283042,31.86119",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "350000",
                                                name: "福建省",
                                                center: "119.306239,26.075302",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "430000",
                                                name: "湖南省",
                                                center: "112.982279,28.19409",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "460000",
                                                name: "海南省",
                                                center: "110.33119,20.031971",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "320000",
                                                name: "江苏省",
                                                center: "118.767413,32.041544",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "630000",
                                                name: "青海省",
                                                center: "101.778916,36.623178",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "450000",
                                                name: "广西壮族自治区",
                                                center: "108.320004,22.82402",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "640000",
                                                name: "宁夏回族自治区",
                                                center: "106.278179,38.46637",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "360000",
                                                name: "江西省",
                                                center: "115.892151,28.676493",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "330000",
                                                name: "浙江省",
                                                center: "120.153576,30.287459",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "130000",
                                                name: "河北省",
                                                center: "114.502461,38.045474",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: "1852",
                                                adcode: "810000",
                                                name: "香港特别行政区",
                                                center: "114.173355,22.320048",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: "1886",
                                                adcode: "710000",
                                                name: "台湾省",
                                                center: "121.509062,25.044332",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: "1853",
                                                adcode: "820000",
                                                name: "澳门特别行政区",
                                                center: "113.54909,22.198951",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "620000",
                                                name: "甘肃省",
                                                center: "103.823557,36.058039",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "510000",
                                                name: "四川省",
                                                center: "104.065735,30.659462",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: "022",
                                                adcode: "120000",
                                                name: "天津市",
                                                center: "117.190182,39.125596",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "140000",
                                                name: "山西省",
                                                center: "112.549248,37.857014",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "530000",
                                                name: "云南省",
                                                center: "102.712251,25.040609",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: "010",
                                                adcode: "110000",
                                                name: "北京市",
                                                center: "116.405285,39.904989",
                                                level: "province",
                                                districts: []
                                            },
                                            {
                                                value:10,
                                                citycode: [],
                                                adcode: "220000",
                                                name: "吉林省",
                                                center: "125.3245,43.886841",
                                                level: "province",
                                                districts: []
                                            }
                                        ]
                            }
                        ]
                    }
                },
                true
            );
        },
        add(item) {
            // let a = this.rightData.filter(val => {
            //     return val.id == item.id
            // })
            // if(a.length>0) return
            this.rightData.push(item);
            console.log(this.rightData);
            this.rightData = [...new Set(this.rightData)];
            console.log(this.rightData);
        },
        btn($event) {
            console.log($event, "99");
            this.bol = !this.bol;
            this.name = "雄安";
            this.obj.a = "djhjs";

            //? 监听组件的 updated 钩子函数
            this.$on("hook:updated", () => {
                console.log("监听 updated 生命周期触发");
            });
        },

        cs() {
            // ! 注释---------
            // ? 注释---------
            // todo 注释---------
            // // 注释---------
            // * 注释---------
        }
    }
};
</script>
<style lang="less">
.home {
    .box1,
    .box2 {
        width: 100px;
        height: 100px;
        border: 1px solid rebeccapurple;
    }
}
</style>