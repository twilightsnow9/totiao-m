<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 输入框 -->
    <van-form 
      validate-first
      :show-error="false"
      :show-error-message="false"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        left-icon="phone-o"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="description"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-button class="send-btn" size="small" round
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登陆 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api/user";

export default {
  name: "loginIndex",
  data() {
    return {
      user: {
        mobile: "",//手机号
        code: "" //验证码
      },
      formRules:{
        mobile:[
          { required: true, message: '请输入手机号' },
          {pattern:/^1[3|5|7|9]\d{9}$/, message:'手机号格式错误'}
        ],
        code:[
          { required: true, message: '请输入验证码' },
          {pattern:/^\d{6}$/, message:'验证码格式错误'}
        ],
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async onLogin() {
      // 登录提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        // 展示时长 0为持续显示
        duration: 0,
      });
      // 找到数据接口
      // 封装请求方法
      // 请求调用登录
      // console.log(this.user);
      try {
        const res = await login(this.user);
        this.$toast("登录成功");
        // 处理响应结果
        console.log(res);
      } catch (error) {
        console.log(error);
        this.$toast.fail("登录失败,手机号或密码输入不正确");
      }

      // 处理响应结果
    },
    onFailed(error) {
      // console.log('验证失败',error);
      if(error.errors[0]) {
        this.$toast({
          message : error.errors[0].message,
          position: 'top'
        })
      }
    }
  },
};
</script>

<style scoped lang="less">
.login-container {
  .send-btn {
    width: 85px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>