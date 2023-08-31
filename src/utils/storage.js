
/**
 * 本地存储模块封装
 */
export const getItem = (name) => {
  const data = window.localStorage.getItem(name)
  try {
    // 将data转换成js对象
    return JSON.parse(data)
  } catch (error) {
    return data
    // data不是json 原样返回
  }
  
}
export const setItem = (name,value) => {
  // 如果value是对象就把value转换为json
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name,value)
}

export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
