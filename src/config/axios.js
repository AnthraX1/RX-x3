/**
 * http配置
 */
import axios from 'axios'
import ip from "./ipconfig.js"

// axios 配置
axios.defaults.timeout = 50000;
axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'http://120.55.46.197:8080/v1';
// axios.defaults.baseURL = 'http://192.168.200.110:8080/v1';
// axios.defaults.baseURL = 'http://127.0.0.1:8080/v1';
axios.defaults.baseURL = `http://${ip.ip}:8080/v1`;
// axios.defaults.baseURL = 'http://192.168.67.12:8080/v1';
// axios.defaults.baseURL = 'http://192.168.67.31:9888/v1';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // console.log("config",config);
        return config;
    },
    // err => {
    //     return Promise.reject(err);
    // }
);

// http response 拦截器
axios.interceptors.response.use(

    response => {
        // console.log("response", response.data);
        if ('auth' in response.data) {
            if (response.data['auth'] === 'Fail') {
                window.location.href = '#/login'
            }
        }
        // 登录失效
        // if (response.data.code == 10001) {
        // }
        return response;
    },
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