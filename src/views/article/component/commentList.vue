<template>
  <div class="commentList">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <commentItem
        v-for="(comment,index) in list" :key="index" 
        :title="comment.content"
        :comment="comment"
      />

    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import commentItem from './comment-item.vue'

export default {
  name:'commentList',
  components:{ commentItem },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset : null,
      limit: 10
    };
  },
  props: {
    source :{
      type: [Number, String, Object],
      required:true
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
       // 请求获取数据
      const {data} = await getComments({
        // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        type: 'a',
        // 	源id，文章id或评论id
        source: this.source, 
        offset: this.offset,//页码
        limit: this.limit//每页大小
      })
      // 把数据放到列表中
      const { results } = data.data
      this.list.push(...results)
      // 将loading关闭
      this.loading = false
      // 判断是否还有数据
      if (results.length) {
        // 如果有，更新获取下一页数据的页码
        this.offset = data.data.last_id
      } else {
        // 如果没有数据，则将finished 设置为true
        this.finished = true
      }
    },
  },
}
</script>

<style>

</style>