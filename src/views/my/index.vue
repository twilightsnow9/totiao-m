<template>
  <div class="my-container">
    <div class="user-info">
      <van-cell-group v-if="user" class="my-info">
        <van-cell
          class="base-info"
          center
          :border="false"
        >
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="currentUser.photo"
            />
          <div slot="title" class="name">{{currentUser.name}}</div>
          <van-button 
            class="update-btn" 
            size="small" 
            round 
            to="/user/profile"
          >编辑资料</van-button>
        </van-cell>
        <van-grid :border="false" class="data-info">
          <van-grid-item class="data-info-item">
            <div slot="text" class="text-wrap">
              <div class="count">{{currentUser.art_count}}</div>
              <div class="text">头条</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <div slot="text" class="text-wrap">
              <div class="count">{{currentUser.follow_count}}</div>
              <div class="text">关注</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <div slot="text" class="text-wrap">
              <div class="count">{{currentUser.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <div slot="text" class="text-wrap">
              <div class="count">{{currentUser.like_count}}</div>
              <div class="text">获赞</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell-group>

      <div class="not-login" v-else>
        <div @click="$router.push('/login')">
          <img class="mobile" src="./手机.png" alt="">
        </div>
        <div class="text">登录 / 注册</div>
      </div>

      <van-grid :column-num="2" class="nav-grid mb-4" >
        <van-grid-item 
          icon="star-o" 
          text="收藏" 
          class="nav-grid-item"
          icon-size="22"
          color="#eb5253"
        />
        <van-grid-item 
          icon="browsing-history-o" 
          text="历史" 
          class="nav-grid-item"
          icon-size="22"
          color="#ff9d1d"
        />
      </van-grid>

      <van-cell title="消息通知" is-link to=""/>
      <van-cell title="小智同学" is-link to="" class="mb-4"/>
      <van-cell
        v-if="user"
        class="logout-cell" 
        title="退出登录"
        @click="onlogOut"
      />
    </div>
  </div>
</template>

<script>
import  {mapState} from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
    name:'myIndex',
    data() {
      return {
        currentUser: {} //用户的登陆信息
      }
    },
    computed: {
      ...mapState(['user'])
    },
    created () {
      this.loadCurrentUser()
    },
    methods: {
      onlogOut () {
        this.$dialog.confirm({
          title:'退出提示',
          message:'确认退出吗？'
        }).then(() => {
          //清除用户登录状态
          this.$store.commit('setUser', null )
        }).catch(() => {

        })
      },
      async loadCurrentUser () {
        const { data } = await getUserInfo()
        this.currentUser = data.data
      },
    },

}
</script>
 
<style scoped lang="less">
  .my-container {
    .my-info {
      background: url("./banner.png") no-repeat;
      background-size: cover;
      .base-info {
        box-sizing: border-box;
        background-color: unset;
        height: 115px;
        padding-top: 38px;
        padding-bottom: 11px;
        .avatar {
          box-sizing: border-box;
          width: 66px;
          height: 66px;
          border: 1px solid #fff;
          margin-right: 11px;
        }
        .name {
          color: #fff;
          font-size: 15px;
        }
        .update-btn {
          height: 16px;
          color: #666;
          font-size: 10px;
        }
      }
      .data-info {
        .data-info-item {
          height: 65px;
          color: #fff;
          .text-wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .count {
              font-size: 18px;
            }
            .text {
              font-size: 11px;
            }
          }
        }
      }
      /deep/  .van-grid-item__content {
        background-color: unset;
      }
    }
    .not-login {
      display: flex;
      height: 180px;
      background: url("./banner.png") no-repeat;
      background-size: cover;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile {
        width: 66px;
        height: 66px;
      }
      .text {
        color: #fff;
        font-size: 14px;
      }
    }
    .nav-grid {
      .nav-grid-item {
        height: 70px;
        /deep/ .van-icon-star-o {
          font-size: 22px;
          color: #eb5253;
        }
        /deep/ .van-icon-browsing-history-o {
          font-size: 22px;
          color: #ff9d1d;
        }
        .van-grid-item__text {
          font-size: 14px;
          color: #333;
        }
      }
    }
    .logout-cell {
      text-align: center;
      color: #d86262;
    }
    .mb-4 {
      margin-bottom: 4px;
    }
  }
</style> 