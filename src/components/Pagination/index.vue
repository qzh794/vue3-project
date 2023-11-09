<template>
  <el-pagination
  v-model:current-page="props.pageNum"
  v-model:page-size="props.pageSize"
    :page-sizes="props.pageSizes"
    :total="props.total"
    :background="true"
    layout="prev, pager, next, jumper, ->, sizes, total"
    @size-change="onSizeChange"
    @current-change="onCurrentChange"
  />
</template>

<script setup>

import { defineProps, defineEmits } from 'vue'
const props = defineProps(['pageNum', 'pageSize', 'pageSizes','total', ])
const emit = defineEmits(['update:pageNum','update:pageSize','sizeChange', 'currentChange'])
// val，为触发@current-change或者@size-change内部传递给右侧函数的值（页码或者数据量，根据触发方法为主），不用显示传参
const onSizeChange = (val) => { 
                          // 重置页码为第一页
  emit('update:pageSize',(props.pageNum = 1,props.pageSize=val)); 
  emit('sizeChange');
}

const onCurrentChange = (val) => {
  emit('update:pageNum',(props.pageNum=val));
  emit('currentChange')
}


</script>
