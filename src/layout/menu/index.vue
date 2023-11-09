<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-unused-vars -->
<template>
     <template v-for="(item,index) in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <template v-if="!item.meta.hidden">
                <el-menu-item  :index="item.path" @click="goRoute">
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <template #title>
                    <!-- 使用动态组件，将icon绑定到is属性，实现图标 -->    
                    <!-- title的值作为菜单 -->
                    <span>{{item.meta.title}}</span>
                    </template>
                </el-menu-item>
            </template>
            
        </template>
        
        <!-- 有子路由但只有一个 -->
        <!-- 只有一个子路由那就不做折叠，直接输出 -->       
        <el-menu-item v-if="item.children && item.children.length===1" :index="item.children[0].path" @click="goRoute">
            <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
            </el-icon>

            <template #title>
                <span>{{item.children[0].meta.title}}</span>
            </template>
        </el-menu-item>
        <!-- 有子路由且多于一个 -->
        <el-sub-menu v-if="item.children&&item.children.length>1" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <template v-for="(subItem,index) in item.children" :key="subItem.path">
        <el-menu-item  :index="subItem.path" @click="goRoute">
                <el-icon>
                    <component :is="subItem.meta.icon"></component>
                </el-icon>
                
                <template #title>

            <span>{{ subItem.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-sub-menu>
    </template>

</template>

<script setup>
import { useRouter } from 'vue-router';
let $router=useRouter()
//获取父组件传递过来的全部路由的数据
defineProps(['menuList'])
const goRoute=(vc)=>{
    $router.push(vc.index)
}
</script>
<style>    
</style>