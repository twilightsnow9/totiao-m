<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell
      title="头像"
      is-link
      center
    >
      <van-image
        width="30px"
        height="30px"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
    />
    <van-popup 
      v-model="show" 
      position="top" 
      :style="{ height: '30%' }" 
    />

  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'

export default {
  name:'userProfile',
  data() {
    return {
      user:{}
    }
  },
  created() {
    this.loadUserprofile()
  },
  methods: {
    async loadUserprofile () {
      const {data} =  await getUserProfile()
      this.user = data.data
      console.log(data);
    }
  }
}
</script>

<style>

</style>