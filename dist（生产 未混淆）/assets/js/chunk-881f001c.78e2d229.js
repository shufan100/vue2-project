(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-881f001c"],{"28fa":function(n,t,o){"use strict";o("6f7f")},"3e47":function(n,t,o){"use strict";o.r(t);var e,i,a=function(){var n=this,t=n._self._c;return t("div",{attrs:{id:"maps"}},[n._v(" "+n._s(n.sum)+" "),t("button",{on:{click:n.add}},[n._v("111")]),t("div",{attrs:{id:"gdMap"}})])},s=[],l=(o("0363"),o("2f62")),c={data(){return{mouseTool:null}},computed:{...Object(l["e"])({info:n=>n.func.info,isEnglish:n=>n.isEnglish}),...Object(l["e"])(["sum"])},watch:{isEnglish(){this.getgdMap(),console.log(this.isEnglish)},"$store.state.isEnglish":(n,t)=>{console.log(n,t,"==11=")},sum(n,t){console.log(n,t)}},mounted(){console.log(this.$store.state.isEnglish,"---"),this.getgdMap()},methods:{...Object(l["b"])(["jiasum"]),add(){this.jiasum(20)},getgdMap(){var n=new AMap.LngLat(116.397428,39.90923);e=new AMap.Map("gdMap",{resizeEnable:!0,zoom:11,center:n,lang:"zh_cn"}),e.setLang(this.isEnglish),e.on("complete",()=>{this.$notify.success("地图加载完成！")}),e.plugin(["AMap.ToolBar"],(function(){e.addControl(new AMap.ToolBar({liteStyle:!1}))})),e.plugin(["AMap.Scale"],(function(){e.addControl(new AMap.Scale)})),e.plugin(["AMap.OverView"],(function(){e.addControl(new AMap.OverView)}));var t=new AMap.ContextMenu;t.addItem("放大一级",(function(){e.zoomIn()}),0),t.addItem("缩小一级",(function(){e.zoomOut()}),1),t.addItem("缩放至全国范围",(function(n){e.setZoomAndCenter(4,[108.946609,34.262324])}),2),t.addItem("添加标记",(function(n){new AMap.Marker({map:e,position:i})}),3),e.on("rightclick",(function(n){t.open(e,n.lnglat),i=n.lnglat}))}}},u=c,d=(o("28fa"),o("2877")),p=Object(d["a"])(u,a,s,!1,null,"706b64fd",null);t["default"]=p.exports},"6f7f":function(n,t,o){}}]);