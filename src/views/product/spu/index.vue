<script lang="ts" setup>
import { ref } from "vue";
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()

let scene = ref(true)

// 分页器默认页码
let pageNo = ref(1)
// 分页器默认每页条数
let pageSize = ref(3)
// 分页器默认总条数
let total = ref(0)
</script>

<template>
  <div>
    <Category :scene="scene" />

    <el-card style="margin: 10px 0">
      <el-button
        type="primary"
        :disabled="categoryStore.c3Id ? false : true"
        @click=""
      >
        <IEpPlus />
        添加属性
      </el-button>

      <el-table
        style="margin: 10px 0;"
        border
      >
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column label="SPU名称"></el-table-column>
        <el-table-column label="SPU描述"></el-table-column>
        <el-table-column label="SPU操作"></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 10, 30]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="changeSize"
        @current-change="changePageNo"
      />

    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
