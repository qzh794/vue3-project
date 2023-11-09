<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <router-view v-if="flag"></router-view>      
</template>
    
<script setup>
import { watch,ref,nextTick } from 'vue';
  import useLayoutSettingStore from '@/store/modules/setting.js'
  const useSettingStore=useLayoutSettingStore()
  //监听是否refresh发生变化
  const flag=ref(true)
watch(()=>{return useSettingStore.state.refresh},()=>{
  
  flag.value=false;
  //nextTick：当响应式数据发生变化时候，可以获取更新后的dom
  //          这里更新后的dom就是没有路由组件，然后再在内部重新创建，以此实现刷新功能
  nextTick(()=>{
    flag.value=true;
  })
 
})
</script>

<style>
    
</style>