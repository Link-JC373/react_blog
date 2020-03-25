import axios from 'axios'
const ConfigBaseURL = 'http://localhost:7000/' //默认路径，这里也可以使用env来判断环境
let loadingInstance = null //这里是loading
//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8'
//   }
})
// const address = '127.0.0.1/7001'
Service.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config);
    
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
Service.interceptors.response.use(
     res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)
    ,function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
class Request {
     post = async (url:string, data?:object,) =>{
        try {
            const result = await Service.post(url, data)
            return result

        } catch (error) {
            
        }

     }
}

export default Request