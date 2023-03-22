import Vue from 'vue'
import VueI18n from 'vue-i18n'

import zhLocale from './zh'
import enLocale from './en'

import { getToken } from '@/utils/common/jsCookie'
if (process.env.NODE_ENV === 'development') Vue.use(VueI18n)

// 注册i18n实例并引入语言文件，文件格式等下解析
Vue.config.silent = false
const i18n = new VueI18n({
  // 无cookie时设置为中文，切换中英文会存入中英文得cookie用于区分
  locale: getToken('lang') || 'en',
  messages: {
    zh: { ...zhLocale },
    en: { ...enLocale }
  }
})
export default i18n
