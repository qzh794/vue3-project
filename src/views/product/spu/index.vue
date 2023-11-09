<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- 顶部为三级分类 -->
    <Category />
    <!-- 底部是一个卡片 -->
    <el-card style="margin: 10px 0">
      <div v-show="scence == 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.state.getCategoryId3 ? false : true"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table :data="spuArr" style="margin: 10px 0" border>
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名称">
            <template #default="{ row }">
              {{ row.spuName }}
            </template>
          </el-table-column>
          <el-table-column label="SPU描述" show-overflow-tooltip>
            <template #default="{ row }">
              {{ row.description }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="primary" size="small" icon="Plus"></el-button>
              <el-button
                type="warning"
                size="small"
                icon="Edit"
                @click="updateSpu(row)"
              ></el-button>
              <el-button type="primary" size="small" icon="View"></el-button>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        
        <Pagination
          v-model:pageNum="pageNum"
          v-model:pageSize="pageSize"
          :pageSizes="pageSizes"
          :total="total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        />
       
      </div>
      <!-- 添加SPU|修改SPU子组件 -->
      <SpuForm v-model:scence="scence" v-show="scence == 1" ref="spu"></SpuForm>
      <!-- 添加SKU子组件 -->
      <SkuForm v-show="scence == 2"></SkuForm>
    </el-card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
// 定义场景的数据,切换场景的时候使用
import useCategoryStore from '../../../store/modules/category'
import { reqHasSpu } from '../../../api/spu'
import { onBeforeUnmount } from 'vue'
// 引入子组件
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
let scence = ref(0) //场景0显示已有的SPU 场景1：添加或者修改已有的SPU 2：添加SKU结构
let pageNum = ref(1)
let pageSize = ref(3)
let total = ref(0)
let pageSizes = ref([3, 6, 9, 12])
let spuArr = ref([])
let spu = ref()
let categoryStore = useCategoryStore()
watch(
  () => categoryStore.state.getCategoryId3,
  () => {
    // 务必保证有三级分类ID（因为一级分类有变动，三级分类将会删除）
    if (!categoryStore.state.getCategoryId3) {
      return
    }
    getdata()
  },
)
async function getdata() {
  // 解构操作
  const { getCategoryId3 } = categoryStore.state
  let result = await reqHasSpu(pageNum.value, pageSize.value, getCategoryId3)
  if (result.code == 200) {
    spuArr.value = result.data.records
    total.value = result.data.total
  }
}
const handleSizeChange=()=>{
  getdata()
  console.log();
}
const handleCurrentChange=()=>{
  getdata()
  console.log();

}
const addSpu = () => {
  // 切换为场景1：添加与修改已有spu结构->spuform
  scence.value = 1
}
const updateSpu = (row) => {
  // 切换为场景1：添加与修改已有spu结构->spuform
  scence.value = 1
  // 通过ref获取到子组件的vc实例，父组件可以调用其中的方法等，因此请求方法可以写到子组件之中
  spu.value.initfun(row)
}
onBeforeUnmount(() => {
  // 直接置空，不需要全部属性一个个.空去清除
  categoryStore.$reset()
})
</script>

<style></style>
