// 导入请求方法
import request from "@/utils/request";
/**
 * 
 * 获取所有列表
 */

export const getAllChannels =  () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels',
  })
}

/**
 * 
 * */ 
export const addUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels
    }
  })
}
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`,
  })
}