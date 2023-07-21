// px单位转rem
// 行内样式不会转换
module.exports = {
    plugins: {
      'autoprefixer': {
        browsers: ['Android >= 4.0', 'iOS >= 8']
      },
      'postcss-pxtorem': {
        rootValue: 37.5,
        propList: ['*']
      }
    }
  }