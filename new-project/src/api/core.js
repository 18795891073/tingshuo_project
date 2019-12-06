/**
 * Api 配置
 * Created by Administrator on 2017/5/18 0018.
 */

import axios from 'axios'
import Vue from 'vue'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create({
  //baseURL: process.env.API_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  baseURL:'http://192.168.1.150:9000/web3',
  timeout: 15000 ,// 请求超时,
})

//request拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  let token = localStorage.getItem('token') //localStorage.setItem('token',)
  // config.headers['Authorization'] = token
  // return config
  if (token) {
    // config.headers['Authorization'] = 'bearer '+ token
    config.headers.accessToken = token;
  }
  return config
}, function (error) {
  router.push('login')
  return Promise.reject(error)
})
// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // router.push('/login')
    }
  }
  return Promise.reject(error)
})

export default service
