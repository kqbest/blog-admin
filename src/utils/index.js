const utils = {
    /**
     * 接口参数必填校验
     * @param {
     *   code 校验参数
     *   message 错误提示信息
     * } obj
     */
    checkRequired (obj) {
        let result = {
            type: true,
            message: ''
        }
        if (!obj) { return result }
        const type = Object.prototype.toString.call(obj)
        if (type === '[object Array]') {
            for (const k of obj) {
                if (!k.code) {
                    result.type = false
                    result.message = k.message
                    break
                }
            }
        } else if (type === '[object Object]') {
            if (Object.keys(obj).length > 0) {
                if (!obj.code) {
                    result.type = false
                    result.message = obj.message
                }
            }
        }
        return result
    },

    // 深拷贝
    copy (obj) {
        return JSON.parse(JSON.stringify(obj))
    }
}
export default utils