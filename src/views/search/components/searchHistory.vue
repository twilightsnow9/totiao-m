<template>
  <div class="searchHistory">
    <van-cell 
      title="搜索历史"
    >
      <div v-if="isDeleteShow">
        <span 
          @click="$emit('updata-histories',[])"
        >全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon 
        @click="isDeleteShow = true"
        v-else
        name="delete"
      />
    </van-cell>
    <van-cell
      v-for="(history,index) in searchHistorys" :key="index"
      :title="history"
      @click="onDelete(history,index)"
    >
      <van-icon
        v-show="isDeleteShow"
        name="close"
      />
    </van-cell>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isDeleteShow: false
    }
  },
  props:{
    searchHistorys: {
      type:Array,
      required:true
    }
  },
  methods:{
    onDelete (history,index) {
      if (this.isDeleteShow) {
        // 保证是删除状态，执行删除操作
        this.searchHistorys.splice(index, 1)
        // 数据持久化处理
        //修改本地存储的数据
        //请求接口删除线上数据
        //如果已登录，则删除线上的历史数据
      } else {
        this.$emit('search',history)
      }
      // 非删除状态执行搜索结果
      
    }
  },


}
</script>

<style>

</style>