import Vue from 'vue'
import Vuex from 'vuex'
import { getItem,setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) //当前登陆用户的登陆状态
      // user: JSON.parse(window.localStorage.getItem('user')) //当前登陆用户的登陆状态
  },
  getters: {
  },
  mutations: {
    setUser (state,data) {
      state.user = data
      //为了方式页面刷新数据丢失，还需要把数据放到本地存储，使数据持久化
      // window.localStorage.setItem('user',JSON.stringify(state.user))
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
