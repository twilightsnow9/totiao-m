import Mock from "mockjs";

Mock.mock('https://toutiao.itheima.net/v1_0/article/collections', 'post', function () {
  return {
    message: '',
    data: {
      target: '@guid',
    }
  }
})
// Mock.mock(/https:\/\/toutiao.itheima.net\/v1_0\/article\/collections${articleId}/, 'delete', function () {
//   return {
//     message: '',
//     data: {
//       target: '0',
//     }
//   }
// })