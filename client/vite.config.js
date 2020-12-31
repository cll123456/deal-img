const path = require('path')
export default function () {
    return {
        // 代理，最重要，其他的都可以有默认配置
        proxy: {
            '/api': {
                target: 'http://localhost:9011',
                changeOrigin: true,
            }
        },
        // 入口
        entry: 'index.html',
        // 出口
        outDir: './../public/html',
        // 打包后的跟路径
        base: '/',
        // 输出的静态资源的文件夹名称
        assetsDir: 'assets',
        // 是否开启ssr服务断渲染
        ssr: false,
        // 重命名路径  path.resolve(__dirname, './src')
        alias: {
            '/@/': path.resolve(__dirname, './src')
        },
        // 端口
        port: 3002,
        // 是否自动开启浏览器
        open: false,
        // 开启控制台输出日志
        silent: false,
        // 那个包不需要打包
        optimizeDeps: [],

    }
}
