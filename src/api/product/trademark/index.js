//品牌管理模块的接口
import request from "../../../utils/request";
//需要携带两个参数：
//page：获取第几页--默认第一页
//limit：获取几个已有品牌的数据
export function reqHasTrademark(page, limit) {
    return request({
      url: `/admin/product/baseTrademark/${page}/${limit}`,
      method: 'get'
    });
  }
export function reqAddTrademark(data){
    return request({
        url:'/admin/product/baseTrademark/save',
        method:'post',
        data:data
    })
}
export function reqEditTrademark(data){
    return request({
        url:'/admin/product/baseTrademark/update',
        method:'put',
        data:data
    })
}
export function reqDelTrademark(id){
    return request({
        url:`/admin/product/baseTrademark/remove/${id}`,
        method:'delete',
    })
}
 
