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
      ref="login_form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        left-icon="phone-o"
        placeholder="请输入手机号"
        name="mobile"
        center
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="description"
        placeholder="请输入验证码"
        name="code"
        center
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60" 
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <!-- @finish="isCountDownShow = false"隐藏倒计时显示发送按钮 -->
          <!-- @click.prevent 阻止默认行为 -->
          <van-button
            v-else
            :loading="isSendSmsLoading"
            class="send-btn" 
            size="small" 
            round 
            @click.prevent="onSendSms"
          >
            发送验证码
          </van-button>
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
import { login, sendSms } from "@/api/user";

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
      },
      isCountDownShow : false ,//控制倒计时和发送按钮的显示状态，
      isSendSmsLoading : false
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
        const {data} = await login(this.user);
        this.$toast("登录成功");
        // 处理响应结果
        this.$store.commit('setUser', data.data)
        this.$router.back() //
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
          position: 'top' //防止手机键盘太高看不见
        })
      }
    },
    async onSendSms() {
      try {
        // 校验手机号
        await this.$refs['login_form'].validate('mobile')
        this.isSendSmsLoading = true //显示按钮的loading状态，防止网络慢用户对此点击
        await sendSms(this.user.mobile)
        // 显示倒计时

        this.isCountDownShow = true
      } catch (error) {
        let message = ''
        // try的任何代码错误都会进入catch
        if (error && error.response && error.response.status === 429) {
          message = '发送太频繁了,请稍后重试'
        } else if (error.name === 'mobile') {
          // 表单验证失败错误提示
          message = error.message
        } else {
          message = '发送失败,请稍后重试'
        }
        this.$toast({
          message,
          position: 'top' //防止手机键盘太高看不见
        })
      }
      // 无论发送验证码是否成功都要关闭loading状态
      this.isSendSmsLoading = false
      // 校验手机号
      // 验证通过 -> 请求发送验证码 -> 显示倒计时 -> 隐藏发送按钮
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