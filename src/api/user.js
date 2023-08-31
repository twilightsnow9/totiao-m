// 用户相关请求模块

// 导入请求方法
import request from "@/utils/request";


/**
 * 登录
 */
export const login = (data) => {
    return request({
        method:'POST',
        url:'/v1_0/authorizations',
        data
    })
}
// 发送短信验证码
export const sendSms = mobile => {
    return request({
        method:'GET',
        url:`/v1_0/sms/codes/${mobile}`,
    })
}
// 获取登录用户信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/',
        // 发送请求头数据
        // headers: {
        //     // 注意：该接口需要授权才能访问
        //     //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}
// 获取用户频道列表
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}