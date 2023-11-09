<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU的名称"
        v-model="spuParams.spuName"
      ></el-input>
    </el-form-item>

    <el-form-item label="SPU品牌">
      <!-- select组件的解读：
                select中的v-model可以绑定单一的值，也可以绑定一个数组
                当选择其中的一个option，就可以把value的值赋值到绑定v-model后的变量中
                （v-model是双向绑定，既可以收集又可以展示数据
                这里意味着把value的值和tmId双向绑定收集了)
                for循环的存在意义是，创建与item足够匹配的option标签
                label是显示option中具体的内容
            -->
      <el-select v-model="spuParams.tmId" placeholder="请选择品牌">
        <el-option
          :label="item.tmName"
          v-for="item in allTradeMark"
          :key="item.id"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请你输入SPU的描述" v-model="spuParams.description"></el-input>
    </el-form-item>

    <el-form-item label="SPU图片">
      <!-- 照片展示属性，有图片，文本等
            照片展示预览，绑定一个钩子 -->
      <el-upload
        v-model:file-list="spuImageList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :bofore-upload="handleUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="height: 100%;width: 100%;" />
      </el-dialog>
    </el-form-item>

    <el-form-item label="SPU销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select v-model="allSaleAttr.id">
        <el-option 
        :label="item.name" 
        v-for="item in allSaleAttr"
        :key="item.id"
        :value="item.id"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        size="default"
        icon="Plus"
      >
        添加属性值
      </el-button>
      <!-- table展示销售属性与属性值的地方 -->
      <el-table :data="data" border style="margin: 10px 0px">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="销售属性名" width="120px"></el-table-column>
        <el-table-column label="销售属性值"></el-table-column>
        <el-table-column label="操作" width="100px"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="confirm">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from '../../../api/spu'
let props = defineProps(['scence'])
let $emit = defineEmits(['update:scence'])
let allTradeMark = ref([])
let spuImageList = ref([])
let spuHasSaleAttr = ref([])
let allSaleAttr = ref([])
// 控制弹窗显示与隐藏
let dialogVisible=ref(false)
// 存储预览图片的url
let dialogImageUrl=ref('')
// 存储收集已有的spu对象，将来用来展示
let spuParams = ref({
  category3Id: '', //收集三级分类的id
  spuName: '', //spu的名字
  description: '', //spu的描述
  tmId: '', //spu的品牌id
  spuImageList: [],
  spuSaleAttrList: [],
})
// upload上传的api属性：
// 照片预览触发钩子(注入预览的当前文件uploadFile)
const handlePictureCardPreview=(file)=>{
  dialogImageUrl.value =file.url
// 点击放大镜dialog弹出，携带照片达到预览效果
  dialogVisible.value=true;4
  console.log(spuParams);
  console.log(spuImageList);
}
// 照片上传之前的钩子（进行类型、大小约束）
const handleUpload=(file)=>{
  if(file.type=='image/png'||file.sype=='image/jpeg'||file.sype=='image/gif'){
    if(file.size/1024/1024<3){
      return true
    }else{
      ElMessage({
        type:'error',
        message:'上传的图片文件大于3MB'
      })
      return false 
    }
  }else{
    ElMessage({
      type:'error',
      message:'上传的文件类型必须为png|jpg|gif'
    })
    return false
  }
}
// 点击取消，通知父组件，切换场景值，展示已有的SPU数据
const cancel = () => {
  // eslint-disable-next-line vue/no-mutating-props
  $emit('update:scence', (props.scence = 0))
}
// const confirm=async()=>{
//   await 
// }
// 创建spu的内部函数，然后defineExpose导出，父组件可以调用
const initfun = async (spu) => {
  spuParams.value = spu
  console.log(spu)
  console.log(spuParams.value)
  console.log(allSaleAttr);
  // 先获取全部品牌的数据
  let result = await reqAllTradeMark()
  allTradeMark.value = result.data
  // 获取某一品牌旗下全部售卖商品图片
  let result1 = await reqSpuImageList(spu.id)
  spuImageList.value = result1.data.map(
    item=>{
      return{
        name:item.imgName,
        url:item.imgUrl
      }
    }
  )
  // 获取已有的spu销售属性的数据 
  let result2 = await reqSpuHasSaleAttr(spu.id)
  spuHasSaleAttr.value = result2.data
  // 获取所有spu的销售属性
  let result3 = await reqAllSaleAttr(spu.id)
  allSaleAttr.value = result3.data
}
defineExpose({ initfun })
</script>

<style scoped></style>
