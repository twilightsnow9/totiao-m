<template>
  <div class="article-list">
    <!-- 下拉刷新  -->
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" :success-text="refreshSuccessText" :success-duration="500">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell  :title="article.title" /> -->
        <ArticleItem 
          v-for="(article,index) in articles" :key="index" 
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article"
import ArticleItem from "@/components/article-item"

export default {
  name:'ArticleList',
  components:{ ArticleItem },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp:null,
      isRefreshLoading: false,
      refreshSuccessText:''
    }
  },
  props: {
    channel:{
      type:Object,
      required: true
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getArticles({
        channel_id: this.channel.id,//频道id
        timestamp:this.timestamp || Date.now() //时间戳
      })
      // 把数据放到list 数组中
      const { results } = data.data
      // console.log(data.data.results);
      // 用展开运算符将数组数据合并
      this.articles.push(...data.data.results)

      // 设置本次加载状态结束,他才能加载下面的数据
      this.loading = false

      if (results.length) {
        // 更新下一页数据的页码
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据
        this.finished = true
      }
    },
    async onRefresh() {
      // 下拉刷新，组件自己就会展示 loading 状态
      // 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,//频道id
        timestamp: Date.now() //时间戳
      })
      // 把数据放到数据列表中
      const { results } = data.data
      this.articles.unshift(...results)
      // 关闭刷新状态
      this.isRefreshLoading = false;

      this.refreshSuccessText = `更新了${results.length}条数据`
    },
  },
}
</script>

<style scoped lang="less">
  .article-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
  }
</style>