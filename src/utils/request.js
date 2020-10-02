import axios from "axios"

const BASEURL = "/"
/* process.env.NODE_ENV === 'PRODUCTION' ? '':''; */
const service = axios.create({
    baseURL: BASEURL,
    
 /*    headers: {'content-type': 'application/json;'}, */

});

export default service;
/* headers:{
    'Content-Type':'application/json',
    "Access-Control-Allow-Origin":"*"
} */
/* headers: {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}, */
/* transformRequest: [function (data) {
    
    data = Qs.stringify(data);
    return data;
}], */
/* withCredentials:true */
/* service.defaults.headers.post['Content-Type'] = 'application/json'; */
/* service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8' */

//axios.baseURL = "http://bestvincent.com:8888/";
// 添加请求拦截器
/* service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
}); */









