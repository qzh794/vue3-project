// SPU管理接口模块的接口
import request from '../../utils/request';
// 参数传递，获取已有的SPU数据
// 获取某一个三级分类下SPU的数据
export function reqHasSpu(page,limit,category3Id){
    return request({
        // 携带了三个参数，页数，一页多少数据，三级id
        url:`/admin/product/${page}/${limit}?category3Id=${category3Id}`,
        method:'get'
    })
}
// 获取所有品牌数据（下拉菜单里展示）
export function reqAllTradeMark(){
    return request({
        url:'/admin/product/baseTrademark/getTrademarkList',
        method:'get'
    })   
}
// 获取某一个spu下的全部商品图片地址（图片墙）
export function reqSpuImageList(){
    return request({
        // 携带SpuId作为参数
        url:`/admin/product/spuImageList/${0}`,
        method:'get'
    })
}
// 获取某一个spu下全部的已有销售属性接口
export function reqSpuHasSaleAttr(){
    return request({
        // 携带SpuId作为参数
        url:`/admin/product/spuSaleAttrList/${0}`,
        method:'get'
    })
}
// 获取整个项目全部的销售属性
export function reqAllSaleAttr(){
    return request({
        url:'/admin/product/baseSaleAttrList',
        method:'get'
    })
}
 export function reqAddOrUpdateSpu(data){
    if(data.id){
    return request({
        url:'',
        method:'post',
        data:'data'
    })
 }else{
    return request({
        url:'',
        method:'post',
        data:'data'
    })
 }
}   

