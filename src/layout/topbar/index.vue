<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="topbar">
    <el-row class="el-row" align="middle">
      <!-- 顶部左侧静态 -->
      <el-col :span="12">
        <Breadcrumb></Breadcrumb>
      </el-col>
      <el-col :span="12" :push="8">
        <Setting></Setting>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'

</script>

<style scoped lang="scss">
.topbar {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid black;
  background-image: linear-gradient(to right, white, rgb(210, 185, 185), white);
  .el-row {
    height: 100%;
  }
  img {
    width: 24px;
    height: 24px;
  }
}
</style>
