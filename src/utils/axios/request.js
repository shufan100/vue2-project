/* eslint-disable no-tabs */
import axios from 'axios'
// import qs from 'qs'
import router from '@/router'

/** {取消上一次请求}
 *  1.定义Map 用于存储正在进行的请求
 *  2.创建一个名为 generateRequestKey 的辅助函数，用于根据请求信息生成唯一的请求 key
 *  3.在请求拦截器中，我们首先根据请求信息生成一个唯一的请求 key。然后检查此请求是否已经存在于 pendingRequests Map 中。
 *    如果存在，则取消之前的请求。最后，我们创建一个新的取消令牌源，并将其与请求 key 一起存储在 pendingRequests Map 中。
 *  4. 在响应拦截器中，我们根据响应信息中的请求配置生成请求 key，并从 pendingRequests Map 中删除对应的请求。这样，我们可以确保在请求完成时清理已完成的请求。
 */
//! 1.用于存储正在进行的请求
const pendingRequests = new Map()
//! 2.用于存储正在进行的请求
function generateRequestKey(config) {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// 创建axios的实例
const rest = axios.create({
  // baseURL: 'http://192.168.2.89:8012',  //请求地址前缀，将自动加在 url 前面，除非 url 是个绝对地址 、不配置的话就直接在接口前写
  // baseURL: 'api', // 设置默认ip
  baseURL: process.env.VUE_APP_URL, // 使用环境配置
  timeout: 5000, // 请求时间
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    }
  },
  // 跨域请求时是否需要使用凭证
  withCredentials: true,
  // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
  validateStatus: function () {
    return true
  }
})

// 拦截器分为request请求拦截器和response响应拦截器 //

// request(请求)拦截器
rest.interceptors.request.use(
  config => {
    if (config.type === 'mock') {
      config.baseURL = '/dev-api'
    }
    // router.push('HiChild') // 请求的话
    // store.dispatch('showLoading', true) // 请求开启loading

    // 提交文件类型
    if (config.data instanceof FormData) {
      config.headers = {
        'Content-Type': 'multipart/form-data'
        // Authorization: store.state.token ? store.state.token : ''
      }
    }

    config.withCredentials = true // 关闭loading
    config.timeout = 5000

    //! 3.在请求拦截器中，我们首先根据请求信息生成一个唯一的请求 key。然后检查此请求是否已经存在于 pendingRequests Map 中。
    //! 如果存在，则取消之前的请求。最后，我们创建一个新的取消令牌源，并将其与请求 key 一起存储在 pendingRequests Map 中
    const requestKey = generateRequestKey(config)
    if (pendingRequests.has(requestKey)) {
      const cancelTokenSource = pendingRequests.get(requestKey)
      cancelTokenSource.cancel('Canceled previous request')
    }
    const source = axios.CancelToken.source()
    config.cancelToken = source.token
    pendingRequests.set(requestKey, source)

    return config
  },
  error => {
    // 请求超时才会走进来
    // store.dispatch('hideloading', false)
    return Promise.reject(error)
  }
)

// respone(响应)拦截器
rest.interceptors.response.use(
  response => {
    //! 4.在响应拦截器中，我们根据响应信息中的请求配置生成请求 key，并从 pendingRequests Map 中删除对应的请求。这样，我们可以确保在请求完成时清理已完成的请求。
    const requestKey = generateRequestKey(response.config)
    pendingRequests.delete(requestKey)

    if (!response.data?.success) {
      return Promise.resolve(response)
    }
    return response.data
  },
  error => {
    if (error.response?.code === 401) {
      router.replace({
        // 跳转到登录页面
        path: '/login'
      })
    }
    // store.dispatch('hideloading', false)
    return Promise.reject(error)
  }
)

export default rest
