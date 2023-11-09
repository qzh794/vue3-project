<!-- eslint-disable vue/multi-word-component-names -->
<template>
      <svg :style={width,height}>
        <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>   
</template>
    
<script setup>
  defineProps({
    prefix:{
        default:'#icon-'
    },
    name:String,
    color:{
        default:''
    },
    width:{
        default:'16px'
    },
    height:{
        default:'16px'
    }
  })  
</script>
    
<style>
    
</style>