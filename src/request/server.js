
import Axios from './index'

function server () {
    this.axios = Axios
}

server.prototype = {
    // 添加请求
    addRequest (moduleName, urlObj) {
        const ob = this[moduleName] = {}
        Object.keys(urlObj).forEach(apiName => {
            ob[apiName] = this.sendFun.bind(this, moduleName, apiName, urlObj[apiName]['type'],  urlObj[apiName]['url'])
            ob[apiName].state = 'ready'
        })
    },
    // 请求方法 config => 自定义配置（type、data、isAsync, setName）
    sendFun (moduleName, apiName, type, url, config) {
        config = config || {}
        type = config.type || type
        let data = config.data || {}
        const requestType = ['post', 'put', 'patch']
        if (!requestType.includes(type)) { data = { params: data } }
        const isAsync = config.isAsync // 是否拦截重复请求
        const setName = config.setName // 数据赋值方法
        // 前置处理
        const beforeFn = res => {
            this[moduleName][apiName].state = 'ready'
            return res
        }
        // 默认处理
        const defaultFn = res => {
            res.code === 200 && setName && setName(res.data)
            return res
        }
        const success = config.success || defaultFn
        const callback = res => {
            success(res, defaultFn)
            return res
        }
        // 拦截重复请求
        if (isAsync || this[moduleName][apiName].state === 'ready'){
            this[moduleName][apiName].state = 'waiting'
            return this.axios[type](url, data).then(beforeFn).then(callback)
        }
    }
}

export default new server()