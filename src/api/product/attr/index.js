import request from "../../../utils/request";
export function reqCategory1(){
   return request({
        url:'/admin/product/getCategory1',
        method:'get',
    })
}
export function reqCategory2(id){
    return request({
        url:`/admin/product/getCategory2/${id}`,
        method:'get',
    })
}
export function reqCategory3(id){
    return request({
        url:`/admin/product/getCategory3/${id}`,
        method:'get',
    })
}
export function reqInfo(id1,id2,id3){
    return request({
        url:`/admin/product/attrInfoList/${id1}/${id2}/${id3}`,
        method:'get'
    })
}
export function reqAddOrUpdateAttr(data){
    return request({
        url:'/admin/product/saveAttrInfo',
        method:'post',
        data:data
    })
}
export function reqDelAttr(attrId){
    return request({
        url:`/admin/product/deleteAttr/${attrId}`,
        method:'delete'
    })
}
