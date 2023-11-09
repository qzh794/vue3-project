//进行axios的二次封装，目的是使用拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '../store/modules/user'

//利用axios对象的create方法去创建一个axios实例，好处是可以配置一些其他配置（基础路径，超时时间）
const request=axios.create({
    //基础路径会携带/api
    baseURL:import.meta.env.VITE_APP_BASE_API,
    //超时时间
    timeout:5000
})
//第二步：request实例添加拦截器
//请求拦截器
request.interceptors.request.use((config)=>{
   //config配置对象的headers属性为请求头，可以给服务器携带公共参数 
   let useStore=useUserStore()
   if(useStore.state.token){
    config.headers.token=useStore.state.token
   }
   
    //返回配置对象
    return config
})
//响应拦截器
request.interceptors.response.use((response)=>{
    //成功回调
    //简化数据
    return response.data
},(error)=>{
    //失败的回调，一般处理http网络错误
    //定义一个变量message，用来存储网络错误信息
    let message='';
    //http状态码
    let status=error.response.status;
    switch(status){
        case 401:
            message='token过期';
            break;
        case 403:
            message='无权访问';
            break;
        case 404:
            message='请求地址错误';
            break;
        case 500:
            message='服务器错误';
            break;
        default:
            message='网络错误';
            break;
    }
    //错误提示
    ElMessage({
        message
    });
    //错误的回调需要返回一个promise对象，终止promise链
    return Promise.reject(error);
})
//对外暴露
 export default request;