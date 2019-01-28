import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import {setToken} from "./auth";

// Create axios instance
console.log(process.env)
const service = axios.create({
  baseURL: process.env.MIX_BASE_API,
  timeout: 5000 // Request timeout
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response pre-processing
service.interceptors.response.use(
  response => {
      if (response.headers.authorization) {
          setToken(response.headers.authorization)
          response.data.token = response.headers.authorization
      }

      return response.data
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
