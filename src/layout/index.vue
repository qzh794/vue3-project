<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
  <el-row>
    <el-col :span="LayoutSettingStore.state.span1"><div class="left-slider">
      <logo></logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
    <!-- 菜单组件 -->
    <el-menu :collapse="LayoutSettingStore.state.fold?true:false" :collapse-transition="false" class="el-menu" :default-active="$route.path"  background-color="#001529" text-color="white">
      <!-- 根据路由动态生成菜单 -->
      <Menu :menuList="useStore.state.menuRoutes"></Menu>
    </el-menu>
  </el-scrollbar>
    </div></el-col>
    <el-col :span="LayoutSettingStore.state.span2">
      <div class="right-content">
        <el-row>
          <el-col :span="24"><div class="topbar">
            <topbar></topbar>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="LayoutSettingStore.state.span2"><div class="main">
            <main_content></main_content>
          </div>
        </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</div>


</template>
    
<script setup>
//引入logo组件
 import logo from './logo/index.vue' 
  //为了default-active，定位到折叠项刷新不会折叠回去
  import { useRoute } from 'vue-router'
  const $route=useRoute()
  //引入菜单组件
  import Menu from '@/layout/menu/index.vue' 
  //引入topbar组件
  import topbar from '@/layout/topbar/index.vue'
  import main_content from '@/layout/main_content/index.vue'
  //引入用户相关的小仓库
  import useUserStore from '@/store/modules/user.js'
  let useStore=useUserStore();
  import useLayoutSettingStore from '@/store/modules/setting.js'
  //引入setting相关的小仓库
let LayoutSettingStore=useLayoutSettingStore()

</script>

<style scoped lang="scss">
   .container{
        width: 100%;
        height: 100vh; 
        .left-slider{
        width: $base-menu-width;
        height: 100vh;
        background-color:$base-menu-background;
       

         .scrollbar{
          width: 100%;
          color: aliceblue;
          height: calc(100vh - $base-menu-logo-height);

          .el-menu{
            border-right: 0px;
          }
        }
        }
       
        .right-content{
          transition: all 0.5s;
         .topbar{
        position: absolute;
        width: 100%;
        height: $base-tabbar-height;
        left:3px;
        padding:0;
         }
         .main{
          position: absolute;
          width:100%;
          background-color: #fff;
          height:calc(100vh - $base-tabbar-height);
          top: $base-tabbar-height;
          left:6px;
          padding: 20px; 
    }   
        }
        }
</style>