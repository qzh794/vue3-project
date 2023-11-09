<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <el-card class="box-card">
        <!-- 卡片顶部添加品牌按钮 -->
        <el-button type="primary" size="default" icon="plus" @click="addTrademark">
            添加品牌
        </el-button>
        <!-- 表格用于展示已有的品牌数据 -->
        <el-table :data="trademarkArr" border style="margin: 10px 0;">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称" prop="tmName"></el-table-column>
            <el-table-column label="品牌LOGO">
                <!-- 可以不用prop，用插槽，可以自定义一些内容,
                而且如果要添加图片，是直接呈现链接，需要img标签去接收 -->
                <template #default="{ row }">
                    <img :src="row.logoUrl" alt="（图片损坏）" style="width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #default="{row}">
                    <el-button type="warning" size="small" icon="Edit" @click="editTrademark(row)"></el-button>
                    <el-button type="danger" size="small" icon="Delete" @click="delTrademark(row)"></el-button>

                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!-- current-page:当前页数 page-size:下拉菜单数据默认展示条数 page-sizes:下拉菜单展示数据条数设置 -->
        <Pagination
          v-model:pageNum="pageNum"
          v-model:pageSize="pageSize"
          :pageSizes="pageSizes"
          :total="total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        />
    </el-card>
    <!-- dialog对话框 -->
    <el-dialog v-model="dialogTableVisible" :title="changeBrand">
        <el-form :model="trademarkParams" :rules="rules" ref="formRef">
            <el-form-item label="品牌名称" prop="tmName">
                <el-input style="width: 80%;padding-left: 10px;"  v-model="trademarkParams.tmName" ></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" prop="logoUrl">
                <!-- show-file-list:展示已上传图片的列表 
                    on-success:上传成功后的钩子
                    before-upload：文件上传之前的钩子，参数为上传的文件，因此可以约束一下上传文件（类型、大小等） 
                    action后需要写上传到的服务器url(注意，因为是发请求，所以服务器前需要加入/api)
                -->
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload"
                    :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar"/>
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus/>
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
            <el-button type="primary" size="default" @click="confirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqHasTrademark,reqAddTrademark,reqEditTrademark,reqDelTrademark } from '../../../api/product/trademark/index'
import { ElMessage,ElMessageBox } from 'element-plus';

//当前页面
let pageNum = ref(1)
//每一页展示多少条数据
let pageSize = ref(4)
let pageSizes = ref([4, 8, 12, 16])
let total = ref(0)
let changeBrand=ref('')
let formRef=ref()
let trademarkArr = ref([])
let trademarkParams=reactive({tmName:'',logoUrl:'',id:''})
let dialogTableVisible = ref(false)
//将获取品牌的接口封装成一个函数
const getHasTrademark = async () => {
    let result = await reqHasTrademark(pageNum.value, pageSize.value)
    if (result.code == 200) {
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
}
//组件挂载完毕钩子--发一次请求，获取第一页，一页三条数据
onMounted(() => {
    getHasTrademark()
})
//分页器当前页码变化时会触发
const handleSizeChange = () => {
    //当前页码发生变化的时候，再次发请求获取对应的数据展示
    getHasTrademark()
}
const handleCurrentChange = () => {
    //当前页码发生变化的时候，再次发请求获取对应的数据展示
    getHasTrademark()
}
const addTrademark = () => {
    changeBrand.value='添加品牌'
    dialogTableVisible.value = !dialogTableVisible.value
    trademarkParams.tmName='',
    trademarkParams.logoUrl=''
    nextTick(()=>{
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoUrl')
    })

}
const editTrademark = (row) => {
    changeBrand.value='修改品牌'
    dialogTableVisible.value = !dialogTableVisible.value
    nextTick(()=>{
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoUrl')
    })
    // trademarkParams.id=row.id
    // trademarkParams.tmName=row.tmName
    // trademarkParams.logoUrl=row.logoUrl
    Object.assign(trademarkParams,row)
}
const delTrademark = (row) => {
    // 设置trademarkParams.id为要删除的品牌id
    trademarkParams.id=row.id
    // 显示确认弹窗
    ElMessageBox.confirm('确定要删除这个品牌吗？', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        // 用户点击确定按钮，执行删除操作
        await reqDelTrademark(trademarkParams.id)
        getHasTrademark()
    }).catch(() => {
        // 用户点击取消按钮，不执行任何操作
    });
};

const confirm=async()=>{
    //再发请求之前，要对整个表单进行表单校验，校验成功后才发请求
    await formRef.value.validate()
    if(!trademarkParams.id){
    let result = await reqAddTrademark(trademarkParams)
    if (result.code==200){
        dialogTableVisible.value = false
        ElMessage({
            type:'success',
            message:'添加品牌成功'
        })
        getHasTrademark()
    }else{
        ElMessage({
            type:'error',
            message:'添加品牌失败'
        })
        dialogTableVisible.value = false
    }
}else{
    let result = await reqEditTrademark(trademarkParams)
    if (result.code==200){
        dialogTableVisible.value = false
        ElMessage({
            type:'success',
            message:'修改品牌成功'
        })
        getHasTrademark()
    }else{
        ElMessage({
            type:'error',
            message:'修改品牌失败'
        })
        dialogTableVisible.value = false
}
}  
}
const cancel=()=>{
    dialogTableVisible.value = !dialogTableVisible.value
}
//文件上传之前的钩子，参数为上传的文件，因此可以约束一下上传文件（类型、大小等）
const beforeAvatarUpload= (rawFile) => {
  if (rawFile.type !== 'image/jpeg'&&rawFile.type !=='image/png') {
    ElMessage.error('上传的图片应该是jpg/png格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不可超过2MB!')
    return false
  }
  return true
}
//上传成功后的钩子,response参数是请求后服务器返回的数据，up~参数就是图片的相应数据
const handleAvatarSuccess=(response,uploadFile)=>{
    //上传成功，返回的url赋值给双向绑定的参数中
    trademarkParams.logoUrl=response.data
    // console.log(response.data);
    //上传成功后，清除校验信息
    formRef.value.clearValidate('logoUrl')
}
//自定义校验方法
const validatorTmName=(rule,value,callback)=>{
    //自定义校验规则(trim除去空格)
    if(value.trim().length>=2){
        callback()
    }else{
        callback(new Error('品牌名称位数应大于等于两位'))
    }
}
const validatorlogoUrl=(rule,value,callback)=>{
    if(value){
        callback()
    }else{
        callback(new Error('logo图片必须上传'))
    }
}
//表单校验
const rules={
    tmName:[{required:true,trigger:'blur',validator:validatorTmName}],
    logoUrl:[{required:true,validator:validatorlogoUrl}]
}

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
