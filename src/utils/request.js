import axios from "axios";
import jsonBig from 'json-bigint'

// 在非组件模块中获取store必须通过这种方式加载
import store from "@/store/";

const request = axios.create({
    baseURL:'https://toutiao.itheima.net/',//基础路径
    // 解决后端id过大的问题
    transformResponse: [function (data) {
        try {
            // 如果转换成功则返回转换的数据结果
            return jsonBig.parse(data)
        } catch (err) {
            // 如果转换失败，则包装为统一数据格式并返回
            return {
                data
            }
        }
    }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state

    // 如果用户已经登陆，统一给用户设置token信息
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }

    // 处理完之后一定要把config返回
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
});
// 响应拦截器

// 导出
export default request