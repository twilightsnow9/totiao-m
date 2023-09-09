// 导入请求方法
import request from "@/utils/request";
/**
 * 
 * 获取所有列表
 */

export const getComments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
// 对评论回复或者点赞
export const addCommentLike = target => {
  return request({
    method: 'post',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}
// 取消对评论回复或者点赞
export const deleteCommentLike = commentId => {
  return request({
    method: 'delete',
    url: `/v1_0/article/likings/${commentId}`,
  })
}