<template>
    <div class="cascad-menu">
        <!-- 二维码 -->
        <VueQr text="Hello world!" :size="80"></VueQr>
        <!-- 图片预览 -->
        <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="srcList"></el-image-viewer>
        <el-button type="primary" size="small" @click="getPreview">图片预览</el-button>
        <!-- pdf预览 -->
        <el-button type="primary" size="small" @click="pdfShow=true">pdf预览</el-button>
        <div class="pdfs" v-if="pdfShow">
            <iframe class="iframe" :src="url"></iframe>
        </div>
        <i class="iconfont icondabiaoguanli"></i>
        <el-button v-preventReClick @click="antiShake">防抖多次触发</el-button>
    </div>
</template>

<script>
import Watermark from "@/utils/watermark"; //路径不要写错
import VueQr from "vue-qr";
import pinyin from "js-pinyin";
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import pdf from 'vue-pdf'; //在线预览pdf
export default {
    data() {
        return {
            url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            srcList: [
                require('@/assets/images/01.jpg'),
                require('@/assets/images/02.jpg'),
			],
			showViewer: false,
            guidePic:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg', // 预览图片的地址
            pdfShow:false,
        };
    },
    components: {
		VueQr,
        ElImageViewer,
        pdf
    },
    mounted() {
        // Watermark.set("水印内容")
        let name = "陈名勤";
        let char = "";
        pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
        char = pinyin.getCamelChars(name);
        console.log(char, "char");
	},
	methods:{
		closeViewer(){
			this.showViewer = false
		},
		getPreview(){
			this.guidePic ? this.showViewer = true: this.$message.info('当前没有可预览的图片')
        },
        pdfCheck(){
            this.$refs.pdf.print()
        },
        antiShake(){
            console.log('1秒触发一次！')
        }
	}
};
</script>
<style lang="less">
.pdfs{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    overflow: scroll;
    z-index: 9999;
    .pdf{
        position: absolute !important;
        top: 10px;
        left: 50%;
        
    }
}
</style>
