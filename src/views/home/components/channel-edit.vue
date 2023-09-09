<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{active : index === active }"
        :icon="(isEdit && index !== 0) ? 'clear' : ''"
        v-for="(channel,index) in userChannels" :key="index" 
        :text="channel.name"
        @click="onUserChannelClick(channel,index)"
      />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in recommendChannels" :key="index" 
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>

  </div>
</template>

<script>
import { getAllChannels,addUserChannel,deleteUserChannel } from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  props: {
    userChannels:{
      type:Array,
      required:true
    },
    active:{
      type:Number,
      required:true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit:false
    }
  },
  computed: {
    ...mapState(['user']),
    // 推荐的频道列表
    recommendChannels () {
      // 所有频道 - 我的频道 = 剩下的推荐的频道
      // filter方法过滤数组
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
      
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    async onAdd (channel) {
      try {
        this.userChannels.push(channel)
        if (this.user) {
          // 已登录，数据存储到线上
          await addUserChannel([{
            id: channel.id, // 频道 id
            seq: this.userChannels.length // 频道的 序号
          }])
        } else {
          // 未登录，数据存储到本地
          setItem('channels', this.userChannels)
        }
      } catch (err) {
        console.log(err)
        this.$toast('添加频道失败')
      }
    },
    onUserChannelClick (channel,index) {
      // 编辑状态，删除频道
      if (this.isEdit && index !== 0) {
        this.deleteChannel(channel,index)
      }else {
        this.switchChannel(index)
      }
      // 非编辑状态，切换频道
    },
    async deleteChannel (channel,index) {
      // 删除频道
      if (index <= this.active) {
        this.$emit('updataActive',this.active -1)
      }
      this.userChannels.splice(index,1)
      // 数据持久化
      if (this.user) {
        await deleteUserChannel(channel.id)
      }else {
        // 没有登录持久化到本地
        setItem('channels', this.userChannels)
      }
    },
    switchChannel (index) {
      // 关闭弹出层(自定义事件)
      this.$emit('close')
      // 切换标签
      this.$emit('updataActive',index)
    }
    
  },

}
</script>

<style scoped lang="less">
  .channel-edit {
    padding-top: 54px;
    .channel-title {
      font-size: 16px;
      color: #333;
    }
    .grid-item {
      width: 80px;
      height: 33px;
      /deep/ .van-grid-item__content {
        background-color: #f4f5f6;
        .van-grid-item__text {
          font-size: 13px;
          color: #222222;
          margin-top: 0;
        }
      }
      /deep/ .van-grid-item__icon {
        position: absolute;
        right: -10px;
        top: -5px;
        font-size: 20px;
        color: #ccc;
      }
    }

    .active {
      /deep/.van-grid-item__text {
          color: red !important;
      }
    }
  }
</style>