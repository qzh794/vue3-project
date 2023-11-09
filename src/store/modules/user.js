//创建用户相关的小仓库
//登录，获取用户信息等相关的
//引入pinia中的钩子defineStore
import {defineStore} from 'pinia'
//引入登陆请求的接口方法
import { reqLogin , getInfo , reqLogout} from '../../api/user'
import{reactive} from'vue'
//import {SET_TOKEN , GET_TOKEN ,REMOVE_TOKEN} from '../../utils/token'
//引入路由（常量路由）
import constantRoute from '../../router/routes'
//钩子中('id/文件名'，()=>{})
//箭头函数中是组合式的各种操作，比如要操作的data，操作的方法等操作，最后return出来并default暴露出去
const useUserStore=defineStore('user',()=>{
    const state=reactive({
      //使用本地存储，达到持久化目的
      //刷新的时候从本地可以捞到这里
        token:'',
        //仓库存储生成菜单所需要的数组（路由）
        menuRoutes:constantRoute,
        username:'',
        avatar:'',

    })
    return{ 
         state,
         //处理用户登录的方法
         //登录要么是成功，要么是失败
         //因此加asyn，根据promise的结果状态来进行成功与失败的判定
         async userLogin(data){
              //登录请求
              let result= await reqLogin(data)
              //token是登录的唯一标识，如果成功应当存储，后续要根据token拿数据
              if(result.code==200){
                //存储一下token
                this.state.token=result.data;
                return 'ok'
              }else{
                //返回一个失败的promise对象，错误以参数形式导入
                return Promise.reject(new Error(result.data))
              }
            },
          //获取用户信息方法
          async userInfo(){
          let result=await getInfo()
          if (result.code==200){
            this.state.username=result.data.name
            this.state.avatar=result.data.avatar
            return'ok'
          }else{
            return Promise.reject(new Error(result.message))
          }
          },
          //退出登录方法
          async userLogout(){
            let result=await reqLogout()
            if(result.code==200){
              this.state.token='',
              this.state.username='',
              this.state.avatar=''
            }else{
              return Promise.reject(new Error(result.message))
            }
          }
    }

},{
  persist:{
    username:'username',
    avatar:'avatar',
    token:'token'
  }
})
export default useUserStore
