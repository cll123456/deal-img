const {errorMsg} = require("../util/apiUtils");


module.exports = (err, req, res, next) => {
    // 如果错误不存在，直接调用后序的中间件
    if (!err) next();
    const errObj = errorMsg(err instanceof Error ? err.message : err || '处理错误', 500);
    res.status(errObj.code).send(errObj);
}
