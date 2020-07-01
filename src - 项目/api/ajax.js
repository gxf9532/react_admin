// 封装ajax发送函数 

import axios from 'axios'
import qs from 'qs'
// 在axios发送请求之前  我们可以添加一个请求拦截器  
// 目的: 将post请求数据的格式转换问urlencoded的格式 username=admin&password=123456


// 请求拦截器 
axios.interceptors.request.use(config  => {
    const {method, data} = config

    if (method.toLowerCase() === 'post' && typeof data === 'object') {
        
        // let resData = qs.stringify(data)
        // console.log(resData)// username=admin&password=123456
        // config.data = resData

        config.data = qs.stringify(data)
    }
    return config
})

// 响应拦截器 
// 在请求结果返回之后并且在指定的请求回调函数之前
axios.interceptors.response.use(response => {
    // console.log(response)
    return response.data
}, error => {
    return new Promise(() => {})
})

export default axios