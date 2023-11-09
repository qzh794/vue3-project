<!-- eslint-disable vue/multi-word-component-names -->
<template>
   <el-card>
        <el-form inline>
            <!-- label是展示数据，value是下拉菜单收集的数据 -->
            <el-form-item label="一级分类">
                <!-- select组件的解读：
                select中的v-model可以绑定单一的值，也可以绑定一个数组
                当选择其中的一个option，就可以把value的值赋值到绑定v-model后的变量中(赋值操作)
                for循环的存在意义是，创建与item足够匹配的option标签
                label是显示option中具体的内容
            -->
                <el-select v-model='categoryStore.state.getCategoryId1' @change="handler1">
                    <el-option v-for="(item1,index) in categoryStore.state.getCategory1"
                     :key="item1.id" :label="item1.name" :value="item1.id"></el-option>  
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model='categoryStore.state.getCategoryId2' @change="handler2">
                    <el-option v-for="(item2,index) in categoryStore.state.getCategory2" 
                    :key="item2.id" :label="item2.name" :value="item2.id"></el-option>    
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model='categoryStore.state.getCategoryId3'>
                    <el-option v-for="(item3,index) in categoryStore.state.getCategory3" 
                    :key="item3.id" :label="item3.name" :value="item3.id"></el-option> 
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>    
</template>
    
<script setup>
    import { onMounted } from 'vue';
    import useCategoryStore from '../../store/modules/category'
    let categoryStore=useCategoryStore()
    const handler1=()=>{
        //清空操作
        categoryStore.state.getCategoryId2=''
        categoryStore.state.getCategoryId3=''
        categoryStore.state.getCategory3=''
        categoryStore.getC2()
        
    }
    const handler2=()=>{
        //清空操作
        categoryStore.getCategoryId3=''
        categoryStore.getC3()
    }
    onMounted(()=>{
        categoryStore.getC1()
    }) 
    
</script>
    
<style scoped lang="scss">
    
</style>