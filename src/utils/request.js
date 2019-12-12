import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getRefreshToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = `Bearer ${getToken()}`
      config.headers['RefreshToken'] = `Bearer ${getRefreshToken()}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (res.code !== 0) {
      Message({
        message: res.msg || '请求失败',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === -3) {
        // to re-login
        MessageBox.confirm('登录已过期，请重新登录', '温馨提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        return
      }
      return Promise.reject(new Error(res.msg || '请求失败'))
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    console.log({ error }) // for debug
    const { msg, status } = error.response.data
    if (status === 401) {
      store.dispatch('user/refreshToken').then(res => {
        const config = error.config
        config.headers['Authorization'] = `Bearer ${getToken()}`
        config.headers['RefreshToken'] = `Bearer ${getRefreshToken()}`
        axios(config)
      })
      return
    }
    Message({
      message: msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
