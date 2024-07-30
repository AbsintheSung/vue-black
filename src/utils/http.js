import axios from 'axios';
import router from '@/router';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    const tokenCode = document.cookie.replace(/(?:(?:^|.*;\s*)tokenCode\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (tokenCode) {
        config.headers.Authorization = tokenCode
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status === 401 || error.response.status === 403) {
        router.push('/login')
    }
    // console.log(error.response.status)
    // console.log('cookie可能過期或是失效，導回login')

    return Promise.reject(error);
});

export default axios;