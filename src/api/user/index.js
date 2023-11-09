//统一管理项目中用户相关的请求接口
import request from "../../utils/request";
//登录接口
export function reqLogin(data) {
    return request({
      url: '/admin/acl/index/login',
      method: 'post',
      data:data
    })
  }
  //获取用户信息接口方法
  export function getInfo() {
    return request({
      url: '/admin/acl/index/info',
      method: 'get',
    })
  }
  //退出登录的接口方法
  export function reqLogout() {
    return request({
      url: '/admin/acl/index/logout',
      method: 'post',
    })
  }
  