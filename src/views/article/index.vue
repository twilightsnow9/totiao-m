<template>
  <div class="article-container" v-if="article">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 导航栏 -->
    <div class="article-wrap">
      <h1 class="title">{{article.title}}</h1>
      <van-cell center class="user-info">
        <div slot="title" class="name">{{ article.aut_name }}</div>
        <van-image
          class="avatar"
          slot="icon"
          width="35px"
          height="35px"
          round
          fit="cover"
          :src="article.aut_photo"
        />
        <div slot="label" class="pubdate">{{ article.pubdate | relativeTime }}</div>
        <van-button
          :type="article.is_followed ? 'default' : 'info'"
          :icon="article.is_followed ? '' : 'plus'"
          class="follow-btn"
          round
          size="small"
          :loading="isFollowLoading"
          @click="onFollow"
          
        >{{ article.is_followed ? '已关注' : '关注'}}
        </van-button>
      </van-cell>
      <div 
        class="markdown-body" 
        v-html="article.content" 
        ref="article-content"
      />
      <!-- 文章评论列表 -->
      <commentList
        :source="articleId"
      />
    </div>

    
    

    <!-- 底部 -->
    <div class="article-big-bottom">
      <div class="article-bottom">
        <van-button 
          class="comment-btn"
          type="default"
          round
          size="small"
        >
          写评论
        </van-button>
        <van-icon name="comment-o"
          badge="123"
          color="#777"
        />
        <!-- 收藏 -->
        <van-icon
          :name="article.is_collected ? 'star' : 'star-o'"
          :color="article.is_collected ? 'orange' : '#777'"
          @click="onCollect"

        />
        <!-- 点赞 -->
        <van-icon
          :name="(article.attitude === 1) ?'good-job' : 'good-job-o'"
          :color="(article.attitude === 1) ? 'hotpink':'#777'"
          @click="onLike"
        />
        <van-icon name="share" color="#777777"></van-icon>
      </div>
    </div>


  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById,addCollect,delectCollect,addLike,delectLike } from '@/api/article'
import { ImagePreview } from 'vant'
import { deleteFollow,addFollow } from '@/api/user'
import commentList from './component/commentList.vue'

// 在组件中获取动态路由参数
export default {
  name:'ArticleIndex',
  components:{commentList},
  props:{
    articleId: {
      type: [String,Number,Object],
      required: true
    }
  },
  data() {
    return {
      article:{},
      isFollowLoading:false,
      isCollectLoading:false
    }
  },
  created() {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticleById(this.articleId)
      this.article = data.data

      // 数据改变，影响(DOM)更新，不是立即的
      // 如果需要修改数据后马上操作被该数据影响的DOM，则需要把代码放到nextTick中
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
    },
    handlePerviewImage () {
      const _this = this;
      // 获取文章内容DOM容器
      const articleContent = this.$refs['article-content']
      // console.log(articleContent);
      // 得到所有的img标签
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {

        imgPaths.push(img.src)
        img.onclick = function (e) {
          // img文件会优先触发跳转，要优先触发点击事件则应该阻止默认事件
          e.preventDefault()
          ImagePreview({
            images:imgPaths,
            startPosition:index
          });
        }
      });
    },
    async onFollow() {
      this.isFollowLoading = true
      // 如果，已经关注就取消关注
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
      } else {
        await addFollow(this.article.aut_id)
      }
      // 如果没有关注，就添加关注
      // 更新视图
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },
    async onCollect () {
      this.$toast.loading({
        message:'操作中...',
        forbidClick: true
      })
      // 如果，已经关注就取消关注
      // if (this.article.is_collected) {
      //   await delectCollect(this.articleId)
      // } else {
      //   await addCollect(this.articledId)
      // }
      // 如果没有关注，就添加关注
      // 更新视图
      this.article.is_collected = !this.article.is_collected
      // 收藏成功提示
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },
    async onLike () {
      this.$toast.loading({
        message:'操作中...',
        forbidClick: true
      })
      // 如果，已经关注就取消关注
      if (this.article.attitude === 1) {
        console.log(this.articleId);
        // await delectLike(this.articleId)
        this.article.attitude = -1
      } else {
        // await addLike(this.articledId)
        this.article.attitude = 1
      }
      // 如果没有关注，就添加关注
      // 收藏成功提示
      this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}收藏成功`)
    }
  }
}
</script>

<style scoped lang="less">
  .article-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
  }
  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
  }
  .user-info {
    .avatar {
      margin-right: 8px;
    }
    .name {
      font-size: 12px;
      color: #333;
    }
    .pubdate {
      font-size: 11px;
      color: #b4b4b4;
    }
    .follow-btn {
      width: 85px;
      height: 25px;
    }

  }
  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
  .article-big-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    /deep/.article-bottom {
      display: flex;
      padding: 8px;
      background-color: #fff;
      .comment-btn {
        flex: 6;
      }
      .van-icon {
        margin-left: 10px;
        flex: 1;
      }
    }
  }


</style>