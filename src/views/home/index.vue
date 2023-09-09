<template>
    <div class="home-container">
        <!-- 导航栏 -->
        <van-nav-bar class="app-nav-bar">
            <van-button 
                class="search-btn" 
                slot="title" 
                icon="search" 
                type="info" 
                round
                size="small"
                to="/search"
            >搜索</van-button>
        </van-nav-bar>
        <!-- 文章频道 -->
        <van-tabs v-model="active" class="channel-tabs" >
            <van-tab
                v-for="channel in channels" :key="channel.id"
                swipe-threshold
                :title="channel.name"
            >
                <ArticleList 
                    :channel="channel"
                />
            </van-tab>

            <div slot="nav-right" class="wap-nav-placeholder"></div>
            <div 
                slot="nav-right"
                @click="isChannelEditShow = true"
                class="wap-nav-wrap"
            >
                <van-icon name="wap-nav"/>
            </div>
        </van-tabs>

        <!-- 弹出层 -->
        <van-popup
            v-model="isChannelEditShow"
            position="bottom"
            class="channel-edit-popup"
            closeable
            close-icon-position="top-left"
            get-container="body"
            style="height: 100%;"
        >
            <ChachannelEdit
                :userChannels="channels"
                @close="isChannelEditShow = false"
                @updataActive='updataActive'
                :active='active'
            />
        </van-popup>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChachannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
    name:'homeIndex',
    components:{
        ArticleList,
        ChachannelEdit
    },
    data() {
        return {
            active: 0 ,//控制被激活的标签
            channels:[],
            isChannelEditShow:false
        }
    },
    computed: {
        ...mapState(['user'])
    },
    created() {
        this.loadChannels()
    },
    methods: {
        // 请求获取频道数据
        async loadChannels () {
            let channels = []
            // 请求获取频道数据
            if (this.user) {
                // 已登录，请求获取线上的用户数据列表
                const {data} = await getUserChannels()
                channels = data.data.channels
            } else {
                // 没有登录，判断是否有本地存储的
                const localChannels = getItem('user-channels')
                // 如果本地存储的频道列表则使用
                if(localChannels) {
                    channels = localChannels
                    // 用户没有登录，本地存储的频道，那就请求默认推荐的频道列表
                } else {
                    const { data } = await getUserChannels()
                    channels = data.data.channels
                }
            }
            this.channels = channels
        },
        updataActive (index) {
            this.active = index
        }
    }
}
</script>

<style scoped lang="less">
    .home-container {
        /deep/ .van-nav-bar__title {
            max-width: none;
        }
        .search-btn {
            width: 277px;
            height: 32px;
            background-color: #5babfb;
            border: none;
            .van-icon {
                font-size: 16px;
            }
            .van-button__text {
                font-size: 14px;
            }
        }
        .channel-tabs {
            /deep/ .van-tab {
                width: 95px;
                border-right: 1px solid #edeff3;
                border-bottom: 1px solid #edeff3;
            }
            /deep/ .van-tabs__line {
                bottom: 20px;
                width: 15px !important;
                height: 3px;
                background: #3296fa;
            }
        }
        .wap-nav-placeholder {
            width: 33px;
            flex-shrink: 0;
        }
        .wap-nav-wrap {
            position: fixed;
            right: 0;
            width: 33px;
            height: 44px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            opacity: .9;
        }
        .van-icon {
            font-size: 22px;
        }
        &:before{
            content:'';
            width: 1px;
            height: 29px;
            background: url("./line.png") no-repeat;
            background-size: contain;
            position: absolute;
        }
    }
</style>