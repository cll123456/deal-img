const express = require('express');
const path = require('path');

// 创建一个服务
const app = express();

const {defaultLogger} = require('./../config/logger')

// 使用vue页面导航中间件，必须要放在前面
const history = require('connect-history-api-fallback');
app.use(history({
    index: path.resolve(__dirname, './../public/html/index.html'),
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'], // 不加这一行，后面有的请求会被拦截
    rewrites: [ // 匹配到api开头的，继续向下传递
        {
            from: /^\/api/,
            to: function (context) {
                return context.parsedUrl.path;
            }
        }
    ]
}));

// 使用静态资源的中间件
app.use(express.static(path.resolve(__dirname, './../public'),{
    maxAge: '1d',
    setHeaders: function (res, path, stat) {
        res.set("Access-Control-Allow-Origin","*")
    },
    redirect: path.resolve(__dirname, './../public/html/index.html')
}));

// 使用cors 跨域中间件
const cors = require('cors');
app.options('*', cors()) // 预检请求
app.use(cors({
    "origin": "*", // 维护运行的的源头
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", // 允许的请求方法名
    "allowedHeaders": ['Authorization'], // 允许的请求头
    "preflightContinue": true, // 解析完后，给下一个中间件
    "optionsSuccessStatus": 200 // 响应的结果
}))

// 使用urlencode 中间件来获取post contentType= application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

// 使用json 中间件来获取post contentTpe =application/json
app.use(express.json())

// 使用apiloagerr 来记录访问api的日志
app.use(require('./../middleware/apiLoggerMiddleware'));

// 使用上传文件的中间件
app.use('/api/upload', require('./uploadApi'))
app.use('/api/pressImg', require('./pressImgApi'))
app.use('/api/download', require('./downloadApi'))

// 使用错误中间件
app.use(require('./../middleware/errorMiddleware'));

app.listen(9011, () => {
    defaultLogger.info('服务启动了,正在监听9011端口，请请留意');
})
