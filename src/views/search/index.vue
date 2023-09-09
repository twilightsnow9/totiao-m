<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        shape="round"
        background=""
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <searchResult 
      v-if="isResultShow"
      :searchText="searchText"
    />
    <!-- 联想建议 -->
    <searchSuggestion 
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- 历史记录 -->
    <searchHistory v-else
      :searchHistorys="searchHistorys"
      @search="onSearch"
      @updata-histories="searchHistorys = $event"
    />
  </div>
</template>

<script>
import searchSuggestion from './components/searchSuggestion.vue'
import searchHistory from './components/searchHistory.vue'
import searchResult from './components/searchResult.vue'
import { setItem,getItem } from '@/utils/storage'

export default {
  name:'SearchIndex',
  data() {
    return {
      searchText:'',
      isResultShow: false, // 控制搜索结果的显示状态
      searchHistorys:getItem('searchHistories') || []
    }
  },
  components:{searchSuggestion,searchHistory,searchResult},
  methods: {
    onSearch (searchText) {
      // 让输入框设置为你要搜索的文本 
      this.searchText = searchText
      const index = this.searchHistorys.indexOf(searchText)
      if (index !== -1) {
        this.searchHistorys.splice(index, 1)
      }
      // 记录搜索历史记录
      this.searchHistorys.unshift(searchText)
      // 如果用户已经登陆请把历史记录存储到线上
      // 如果没有登录则存储到本地
      // 展示搜索结果
      this.isResultShow = true
    },
  },
  watch: {
    // 监视搜索历史数据的变化，存储到本地存储
    searchHistorys () {
      setItem('searchHistories',this.searchHistorys)
    }
  }
}
</script>

<style scoped lang="less">

</style>