<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="left-bar">
      <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="!LayoutSettingStore.state.fold ? 'Fold' : 'Expand'"></component>
      </el-icon>
      <!-- 左侧面包屑 -->
      <el-breadcrumb separator-icon="ArrowRight">
        <!-- 面包屑动态展示路由icon与标题 -->
        <el-breadcrumb-item v-for="(item) in $route.matched" :key="item.path" v-show="item.meta.title" :to="item.path">
          <el-icon style="margin:0 2px; vertical-align: top;">
            <component :is="item.meta.icon"></component>
          </el-icon>
        <span>{{item.meta.title}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </template>
  
  <script setup>
  //引入setting的store
  import useLayoutSettingStore from '@/store/modules/setting.js'
  import { useRoute} from 'vue-router';
  const $route=useRoute()
  const LayoutSettingStore = useLayoutSettingStore()
  //根据是否折叠状态改变图标
  const changeIcon = () => {
    LayoutSettingStore.state.fold = !LayoutSettingStore.state.fold
    //同时更改布局
    LayoutSettingStore.changeSpan()
  }
  </script>
  

  
  <style scoped>
  .left-bar {
    display: flex;
    margin-left: 20px;
  }
  </style>
  