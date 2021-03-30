<template>
    <div>
        <div id="mapChart"></div>
    </div>
</template>
<script>
import echarts from "echarts";
import shanxi from './json/sx.json';

export default {
    data() {
        return {
            mapData: [
                { name: "太原市", value: 100 },
                { name: "阳泉市", value: 2000 },
                { name: "大同市", value: 39990 },
                { name: "长治市", value: 4990 },
                { name: "晋中市", value: 53430 },
                { name: "临汾市", value: 75670 },
                { name: "运城市", value: 8660 },
                { name: "忻州市", value: 969670 },
                { name: "吕梁市", value: 9660 },
                { name: "朔州市", value: 76870 },
                { name: "晋城市", value: 966870 }
            ],
        }
    },
    mounted() {
        this.initMap()
    },
    methods:{
        // 地图
        initMap() {
            echarts.registerMap("shanxi", shanxi);
            let myChart = echarts.init(document.getElementById("mapChart"));
            myChart.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: "{b}<br/>{c}"
                },
                visualMap: {
                    min: 0,
                    max: 100000,
                    text: ["工单数", ""],
                    realtime: false,
                    calculable: true,
                    inRange: {
                        color: ["lightskyblue", "yellow", "orangered"]
                    },
                    textStyle: {
                        color: "#54afd9"
                    },
                    left: "right",
                    padding: [0, 0, 0, 0]
                },
                series: [
                    {
                        name: "山西省",
                        type: "map",
                        mapType: "shanxi", // 自定义扩展图表类型
                        zoom: 1.2,
                        label: {
                            show: true
                        },
                        data: this.mapData
                    }
                ]
            });
            // 地图点击
            myChart.on("click", params => {
                console.log(params);
                this.$success("暂无问题数据");
            });
        },
    }
}
</script>
<style lang="less" scoped>
    #mapChart{
        width: 90%;
        // height: 905;
        min-height: 600px;
    }
</style>