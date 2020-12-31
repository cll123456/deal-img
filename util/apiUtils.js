/**
 * 错误信息的包装
 * @param msg 消息
 * @param code 错误消息码
 * @returns {{msg, code: number}} 结果收集一个错误的对象
 */
exports.errorMsg = function (msg, code = 500) {
    return {
        code: code,
        msg: msg
    }
}

/**
 * 成功信息的包装
 * @param msg
 * @param data
 * @param code
 * @returns {{msg, code: number, data}}
 */
exports.successMsg = function (msg, data, code = 200) {
    return {
        code,
        msg,
        data
    }
}
