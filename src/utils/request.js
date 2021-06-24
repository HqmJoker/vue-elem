import axios from 'axios'
import { ElMessage } from 'element-plus'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
	headers: { 'Cache-Control': 'no-cache', 'If-Modified-Since': '0', 'Content-Type': 'application/json;charset=UTF-8' },
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // config.headers['Content-Type'] = 'application/json'
    // if (store.state.user.token) {
    //   config.headers['x-token'] = getToken()
    // }
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
  response => {
    const res = response.data
    if (response.status !== 200) {
      ElMessage({
        message: error.statusText,
        type: 'error'
      })
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    ElMessage({
      message: error.statusText,
      type: 'error'
    })
		console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
