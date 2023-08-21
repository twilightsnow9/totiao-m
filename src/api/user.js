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