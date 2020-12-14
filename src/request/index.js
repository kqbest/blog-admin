import axios from 'axios'
import { message } from 'antd'

const Axios = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7001/admin/' : `${window.location.origin}/admin/`,
    withCredentials: true, // 跨域请求时是否需要凭证（token）
    timeout: 3 * 60 * 1000,
    xsrfCookieName: 'token',
    xsrfHeaderName: 'token'
})

// 请求拦截器
Axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
Axios.interceptors.response.use(response => {
    if (response.status === 200) {
        if (response.data.code !== 200) {
            if (response.data.code === 401) {
                window.location.href = '/login'
            } else {
                message.error(response.data.message)
            }
        }
        return response.data
    } else {
        return response
    }
}, error => {
    return Promise.reject(error)
})

export default Axios