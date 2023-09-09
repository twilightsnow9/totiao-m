<template>
  <van-cell 
    class="comment-item">
      <van-image
        class="avater"
        slot="icon"
        width="36px"
        height="36px"
        round
        fit="cover"
        :src="comment.aut_photo"
      />
      <div slot="title">
        <div class="title-wrap">
          <div class="name">{{ comment.aut_name}}</div>
          <div class="like-wrap">
              <van-icon 
                class="like-icon"
                :class="{
                  liked:comment.is_liking
                }"
                :name="comment.is_liking ? 'good-job':'good-job-o'"
                @click="onCommentLike"
              />
              <span class="like-count">{{ comment.like_count}}</span>
          </div>
        </div>
        
        <div class="content">{{ comment.content }}</div>
        <div>
          <span class="pubdate">{{ comment.pubdate | dateTime('MM:DD HH:mm') }}</span>
          <van-button
            class="reply-btn"
            round
            size="mini"
          >{{comment.reply_count}} 回复</van-button>
        </div>
      </div>


    </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike} from '@/api/comment'
export default {
  name:'commentItem',
  props: {
    comment: {
      type:Object,
      required:true
    }
  },
  created() {
    console.log(this.comment);
  },
  methods: {
    async onCommentLike () {
      const commentId = this.comment.com_id.toString()
      // if (this.comment.is_likeing) {
      //   await deleteCommentLike(commentId)
      // } else {
      //   await addCommentLike(commentId)
      // }
      this.comment.is_liking = !this.comment.is_liking
    }
  }

}
</script>

<style scoped lang="less">
  .comment-item {
    .avater {
      width: 36px;
      height: 36px;
      margin-right: 13px;
    }
    .name {
      font-size: 14px;
      color: #406599;
    }
    .content {
      font-size: 16px;
      color: #222222;
    }
    .pubdate {
      font-size: 10px;
      margin-right: 10px;
    }
    .title-wrap {
      display: flex;
      justify-content: space-between;
    }
    .like-wrap {
      display:  flex;
      align-items: center;
      justify-content: center;
    }
    .like-icon.liked {
      color: #ff69b4;
    }
  }
</style>