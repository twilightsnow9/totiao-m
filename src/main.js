import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant样式
import Vant from 'vant'
import 'vant/lib/index.css'
//使用动态设置 REM 基准值（html 标签的字体大小）
import 'amfe-flexible'
import "@/style/icon.less"
import './utils/dayjs'

import './mock'

// 加载全局样式
import '@/style/index.less'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
