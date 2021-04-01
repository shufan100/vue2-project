import axios from 'axios';
import qs from 'qs'
import router from '@/router'

// 创建axios的实例
const rest = axios.create({
    // baseURL: 'http://192.168.2.89:8012',  //请求地址前缀，将自动加在 url 前面，除非 url 是个绝对地址 、不配置的话就直接在接口前写
    baseURL:'api', //设置默认ip
    // baseURL:window.IP_URL,
    timeout: 5000, //请求时间
    // headers: {
    //     get: {
    //       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //       // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    //     },
    //     post: {
    //       'Content-Type': 'application/json;charset=utf-8'
    //       // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    //     }
    // },
    // 跨域请求时是否需要使用凭证
    // withCredentials: true,
    // validateStatus: function () {
	// 	// 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
	// 	return true
	// },
})

// 拦截器分为request请求拦截器和response响应拦截器 //

// request(请求)拦截器
// rest.interceptors.request.use(config => {
    // router.push('HiChild') //请求的话
    // store.dispatch('showLoading', true) //请求开启loading
    
    // 判断改变入参类型
    // if(config.method  === 'post'){
    //     config.data = qs.stringify(config.data);
    // }

    // 提交文件类型
    // if (config.data instanceof FormData) {
    //     config.headers = {
    //         'Content-Type': 'multipart/form-data',
    //         'Authorization': store.state.token ? store.state.token : ''
    //     }
    // } else {
    //     // 常规请求
    //     config.headers = {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Authorization': store.state.token ? store.state.token : ''
    //     }
    //     config.data = qs.stringify(config.data)
    // }
    // config.withCredentials = true //关闭loading
    // config.timeout = 5000
    // return config
// }, error => { 
    //请求超时才会走进来
    // store.dispatch('hideloading', false);
    // return Promise.reject(error);
// })

// respone(响应)拦截器
// rest.interceptors.response.use(response => {
    // store.dispatch('hideloading', false)
    // if(!res.data.success){
    //     return Promise.resolve(res);
    // }
    // return response.data
// },error => {
    // if(error.response.status===401){
    //     router.replace({ //跳转到登录页面
    //         path: '/user/login', 
    //     });
    // }
    // store.dispatch('hideloading', false)
    // return Promise.reject(error);
        
// })

export default rest;