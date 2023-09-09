/**
 * dayjs相关配置
 */
import Vue from 'vue'
import dayjs from 'dayjs'

// 配置使用中文语言包
import 'dayjs/locale/zh-cn'
import  relativeTime  from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

//处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().from(dayjs(value))
})
//处理相对时间
Vue.filter('dateTime', (value,format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})