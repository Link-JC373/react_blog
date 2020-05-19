import axios from 'axios'
import { message, Modal } from 'antd';
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
    // console.log(config);

  config.url?.indexOf('/admin/') ?
    config.headers.token = localStorage.getItem('token') :
    config.headers.token = localStorage.getItem('adminToken')
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
Service.interceptors.response.use(
  res => {
    // res.status === 200 ?
    console.log(res);
    
    if (res.status === 200) {
        if (res.data.status && res.data.status === 401) {
          console.log(res.data.status);
          
         Modal.confirm({
           title: '登录过期',
           content: `登录过期，是否刷新页面并重新登录？`,
           onOk: () => {
             localStorage.removeItem('userInfo')
             localStorage.removeItem('token')

            //  window.h
             window.location.reload()
                }
              })
        }
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
      
     } 
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
  
  get = async (url: string) => {
    try {
      const result = await Service.get(url)
      return result
    } catch (error) {
      console.log(error);
      
    }
  }
}

export default Request