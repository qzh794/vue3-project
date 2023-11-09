<!-- eslint-disable vue/multi-word-component-names -->
<template>
      <div class="right-bar">
          <el-button icon="Refresh" size="small" circle @click="updateRefresh"></el-button>
          <el-button icon="FullScreen" size="small" circle @click="fullScreen"></el-button>
          <el-button icon="Setting" size="small" circle></el-button>
          <img :src="useStore.state.avatar" style="margin: 0 10px; border-radius: 13px;" alt="">
          <!-- 下拉菜单 -->
          <el-dropdown>
            <div class="el-dropdown-link">
              {{useStore.state.username}}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>     
</template>
    
<script setup>
  import { useRouter,useRoute } from 'vue-router'; 
  import useUserStore from '../../../store/modules/user'
  import useLayoutSettingStore from '@/store/modules/setting.js'
  const useStore=useUserStore()
  const useSettingStore=useLayoutSettingStore()
  const updateRefresh=()=>{
    useSettingStore.state.refresh=!useSettingStore.state.refresh
  }  
  const fullScreen=()=>{
    //dom对象的一个属性：用来判断是否为全屏，全屏为ture，否则为null
    let full=document.fullscreenElement
    //切换全屏
    if(!full){
      //文档根节点方法实现全屏模式
      document.documentElement.requestFullscreen()
    }else{
      //退出全屏模式
      document.exitFullscreen()
    }
    }; 
    const $router =useRouter()
    const $route=useRoute()
    const logOut=async()=>{
    await useStore.userLogout()
    $router.push({path:'/login',query:{redirect:$route.path}});
    } 
</script>
   
<style scoped>
   img {
    width: 24px;
    height: 24px;
  }
  .right-bar {
    display: flex;
  } 
</style>