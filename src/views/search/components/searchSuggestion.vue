<template>
  <div class="searchSuggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggesstions" :key="index"
      @click="$emit('search',str)"
    >
      <div slot="title" v-html="highLight(str)"></div>
      
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggesstions } from '@/api/search'
import { debounce } from "lodash"
export default {
  name:'searchSuggestion',
  data() {
    return {
    suggesstions: []
    }
  },
  props: {
    searchText :{
      type: String,
      required: true
    }
  },
  // 监视属性
  watch: {
    // 只有当渲染出来之后才会有变化，所以没有第一次的数据
    // 属性名：要监视数据的名称
    // searchText () {
    //   console.log('hello');
    // }
    searchText: {
      // 当数据发生变化会执行handler处理函数
      // 函数防抖(以防单位时间里请求过多) 函数节流
      handler:debounce(async function() {
        // 找到数据接口
        // 请求获取数据
        const { data } = await getSearchSuggesstions( this.searchText )
        this.suggesstions = data.data.options
        // 处理响应结果
      },100),
      // async handler () {
      //   console.log('hello');
      //   // 找到数据接口
      //   // 请求获取数据
      //   const { data } = await getSearchSuggesstions( this.searchText )
      //   this.suggesstions = data.data.options
      //   // 处理响应结果
      // },
      immediate: true //使改回调函数在监听开始后立刻调用

    }
  },
  methods:{
    highLight (str) {
      if (str !== null) {
        return str.replace(
          // 正则匹配模式 g :全局，i : 忽略大小写
          new RegExp(this.searchText,'gi'),
          `<span style="color: red">${this.searchText}</span>`
        )
      }
    }
  }
}
</script>

<style>

</style>