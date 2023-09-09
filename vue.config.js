const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // devServer: {
  //   port: '8082',
  //   proxy: {
  //     '/v1_0': {
  //       target: 'https://toutiao.itheima.net/',
  //       changeOrigin: true
  //     }
  //   }
  // }
})