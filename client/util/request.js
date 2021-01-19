import axios from "axios";
import {tip} from "./messageUtils.js";
// 从本地缓存中获取token

export default function (headers = {}) {
    let instance = axios.create({
        timeout: '30 * 1000',
    });
    // 存在特殊的请求头
    if (Object.keys(headers).length > 0) {
        instance = axios.create({
            timeout: '300 * 1000',
            headers: {
                ...headers,
            }
        })
    }
    // 请求拦截
    instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // 响应拦截
    instance.interceptors.response.use(function (response) {
        return Promise.resolve(response.data) ;
    }, function (error) {
        tip('error','服务端错误，请联系管理员！');
        return Promise.reject(error);
    });

    return instance;
}

