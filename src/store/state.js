import { getToken} from '@/utils/jsCookie'
const state = {
    sidebarOpened: false, //侧边栏默认和logo展开
    // sidebarWidth: 180, //侧边栏宽度
    isEnglish: getToken('lang') || 'zh_cn'
}
export default state;