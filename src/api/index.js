import request from '@/utils/axios/request'

// export function list(query) { //fetchList 自定义名字
//     return request({
//       url: '/article/list', //接口地址
//       method: 'post', //请求方式 get post
//       params: query // 参数
//     })
//   }

// 测试1
export const getTest = data => {
  return request({
    url: '/test',
    method: 'get',
    data
  })
}

// 测试2
export const postTest = data => {
  return request({
    url: '/postTest1',
    method: 'post',
    data
  })
}

// 在线接口
export const getData = data => {
  return request({
    url: 'http://jsonplaceholder.typicode.com/posts/2',
    method: 'get',
    data
  })
}
