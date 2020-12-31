const log4js = require('log4js');
const {apiLogger} = require('./../config/logger')

// 使用log4js 进行自动的记录
module.exports = log4js.connectLogger(apiLogger, {level: 'auto'});
