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
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <searchResult v-if="isResultShow"/>
    <!-- 联想建议 -->
    <searchSuggestion 
      v-else-if="searchText"
      :search-text="searchText"/>
    <!-- 历史记录 -->
    <searchHistory v-else/>
  </div>
</template>

<script>
import searchSuggestion from './components/searchSuggestion.vue'
import searchHistory from './components/searchHistory.vue'
import searchResult from './components/searchResult.vue'
export default {
  name:'SearchIndex',
  data() {
    return {
      searchText:'',
      isResultShow: false // 控制搜索结果的显示状态
    }
  },
  components:{searchSuggestion,searchHistory,searchResult},
  methods: {
    onSearch () {
      console.log('onSearch');
      // 展示搜索结果
      this.isResultShow = true
    },
  },

}
</script>

<style scoped lang="less">

</style>