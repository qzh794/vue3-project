<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <!-- 三级分类全局组件 -->
   <Category/>
    <el-card style="margin:10px 0;">
        <el-button type="primary" size="default" icon="plus" 
         :disabled="categoryStore.state.getCategoryId3 ? false:true" @click="addAttr">
            添加平台属性</el-button>
        <el-table :data="getReqInfo" border style="margin: 10px 0;">
            <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
            <el-table-column label="属性名称" width="120px">
                <template #default="{row}">
                    <div>
                        {{row.attrName}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="属性值名称">
                <template #default="{row}">
                    <el-tag v-for="(item,index) in row.attrValueList" :key="item.id">
                       {{item.valueName}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120px">
                <template #default="{row}">
                    <el-button type="warning" size="small" icon="Edit" @click="editAttr(row)"></el-button>
                    <el-button type="danger" size="small" icon="Delete" @click="delAttr(row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
     <!-- dialog对话框 -->
     <el-dialog v-model="dialogTableVisible" :title="changeBrand">
        
        <el-form :model="attrParams" :rules="rules" ref="formRef">
            <el-form-item label="属性名称" >
                <el-input style="width: 80%;padding-left: 10px;" placeholder="请你输入属性名称"
                 v-model="attrParams.attrName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="attrParams.attrName ? false:true" type="primary" size="default" @click="addAttrValue">添加属性</el-button>
            </el-form-item>
                
            <el-form-item>
                <el-table :data="attrParams.attrValueList" border style="margin: 10px 0;">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性值名称" >
                        <template #default="{row}">
                            <el-input placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
            <el-button type="primary" size="default" @click="confirm">确定</el-button>
        </template>
    </el-dialog>  
 </template>
     
 <script setup>
    import { ElMessage , ElMessageBox} from 'element-plus';
    import { ref, watch, reactive, onBeforeUnmount } from 'vue';
    import { reqInfo,reqAddOrUpdateAttr,reqDelAttr }from '../../../api/product/attr' 
    import useCategoryStore from '../../../store/modules/category'
    let categoryStore=useCategoryStore()
    let changeBrand=ref()
    let attrParams=reactive({attrName:'',id:'',
    attrValueList:[
    {
      attrId: 0,
      id: 0,
      valueName: ""
    }
    ],
    categoryId:0,
    categoryLevel:3
})
    let dialogTableVisible = ref(false)
    let getReqInfo=ref([])
    const getAttr= async()=>{
        const{getCategoryId1,getCategoryId2,getCategoryId3}=categoryStore.state
        let result=await reqInfo(getCategoryId1,getCategoryId2,getCategoryId3)
        if(result.code==200){
            getReqInfo.value=result.data 
        }
    }
    
    watch(()=>categoryStore.state.getCategoryId3, ()=>{
        getAttr()
    })
    const addAttr=()=>{
        //清空属性值
        attrParams.attrName=''
        attrParams.attrValueList.splice(0)
        changeBrand.value='添加属性'
        dialogTableVisible.value=true
        attrParams.categoryId=categoryStore.state.getCategoryId3
    }
    const addAttrValue=()=>{
        console.log(attrParams.categoryId);
        attrParams.attrValueList.push({
            valueName:'',
        })
    }
    const cancel=()=>{
        dialogTableVisible.value=false
    }
    const confirm=async()=>{
        let result=await reqAddOrUpdateAttr(attrParams)
        if(result.code==200){
          ElMessage({
            type:'success',
            message:attrParams.id?'修改成功':'添加成功'
        })
        //再次获取一次全部的数据 
        getAttr()

        }else{
            ElMessage({
            type:'error',
            message:attrParams.id?'修改失败':'添加失败'
        })
        }
        dialogTableVisible.value=false
        
    }
    // 编辑函数
   const editAttr=(row)=>{
    dialogTableVisible.value=true
    changeBrand.value='编辑属性'
    // attrParams.attrName=row.attrName
    // attrParams.attrValueList[0].valueName=row.attrValueList[0].valueName;
    // 原生的方法，可以合并两个对象内容，比赋值更加便利
    Object.assign(attrParams,row)
   }
   const delAttr = (row) => {
    // 设置trademarkParams.id为要删除的品牌id
    attrParams.id=row.id
    // 显示确认弹窗
    ElMessageBox.confirm('确定要删除这个属性吗？', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        // 用户点击确定按钮，执行删除操作
        await reqDelAttr(attrParams.id)
        getAttr()
    }).catch(() => {
        // 用户点击取消按钮，不执行任何操作
    });
};
// 当路由跳转的时候，数据没有清除，理由是数据是存储于仓库之中的，页面重置无法清除仓库中的数据
// 路由组件销毁的时候，需要把仓库分类相关的数据清空
// 一个个置空十分麻烦，仓库对象有一个方法$reset,直接调用可以直接把内部数据全部清空，恢复到起始状态

onBeforeUnmount(()=>{
    // 直接置空，不需要全部属性一个个.空去清除
    categoryStore.$reset();
}) 
 </script>
     
 <style>
     
 </style>