/**
 * http配置
 */
import axios from 'axios'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://120.79.38.80';

// http request 拦截器
axios.interceptors.request.use(
    // config => {
    //     return config;
    // },
    // err => {
    //     return Promise.reject(err);
    // }
);

// http response 拦截器
axios.interceptors.response.use(
    // response => {
    //     // console.log(response.data.code);
    //     // 登录失效
    //     if (response.data.code == 10001) {
    //     }
    //     return response;
    // },
    // error => {
    //     if (error.response) {
    //         switch (error.response.status) {
    //             case 401:
    //             // 401 清除token信息并跳转到登录页面
    //         }
    //     }
    //     // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    //     // return Promise.reject(error.response.data)
    //     return error
    // }
);

export default axios;