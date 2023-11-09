<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div class="logo" v-if="!LayoutSettingStore.state.fold">
    <img :src="setting.logo" alt="">
    <p>{{setting.title}}</p>
</div>

<div class="logo" v-else-if="LayoutSettingStore.state.fold">
    <img :src="setting.logo" alt="">
    <p>{{}}</p>
</div>
 
</template>
<script setup>
    //引入配置文件
    import setting from '/src/setting.js'
    import useLayoutSettingStore from '@/store/modules/setting.js'
  const LayoutSettingStore = useLayoutSettingStore()
</script>
    
<style scoped lang="scss">
    .logo{
        display: flex;
        height: $base-menu-logo-height;
        width: 100%;
        color: white;
        align-items:center;
        padding: 10px;
      
        img{
            width: 40px;
            height: 40px;
        }
        p{
            font-size: $base-logo-title-fonSize;
            margin-left: 10px;
        }
    }
</style>