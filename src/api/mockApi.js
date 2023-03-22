// mock接口
import request from '@/utils/axios/request'

export function getList() {
  return request({
    url: '/excel/list',
    method: 'get',
    type: 'mock'
  })
}
