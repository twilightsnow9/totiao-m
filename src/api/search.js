/**
 * 搜索请求相关模块
 */
import request from "@/utils/request";

/**
 * 获取请求建议
 */
export const getSearchSuggesstions = q => {
  return request({
    method:'GET',
    url:'/v1_0/suggestion',
    params:{
      q //查询搜索关键词
    }
  })
}
// 获取搜索结果
/**
 * 获取搜索结果
 */
export function getSearchResult(params) {
  return request({
    method: "GET",
    url: "/v1_0/search",
    params
  })
}
/**
 * 获取搜索历史
 */
// export const getSearchHistories = () => {
//   return request({
//     method: "GET",
//     url: "/v1_0/search/history",
//   })
// }