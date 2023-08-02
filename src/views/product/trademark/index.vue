<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { getTrademarkListAPI } from '@/api/product/trademark'

import type {
  Records,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'

// 当前页
const pageNo = ref<number>(1)
// 每页显示条数
const limit = ref<number>(3)
const total = ref<number>(0)
const trademarkList = ref<Records>([])

// 获取品牌列表数据
const getTrademarkList = async (pager = 1) => {
  pageNo.value = pager

  const res: TradeMarkResponseData = await getTrademarkListAPI(
    pageNo.value,
    limit.value,
  )
  if (res.code === 200) {
    // 存储数据总条数
    total.value = res.data.total
    trademarkList.value = res.data.records
  }
}
onMounted(() => {
  getTrademarkList()
})
const changePageNo = (page: number) => {
  getTrademarkList(page)
}
// 下拉框改变每页显示条数
const changeSize = () => {
  getTrademarkList()
}
</script>

<template>
  <el-card>
    <el-button type="primary">
      <IEpPlus />
      添加品牌
    </el-button>
    <el-table :data="trademarkList" border style="margin: 10px 0">
      <el-table-column prop="id" label="序号" width="80px" align="center" type="index"/>
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <template #="{ row }">
          <el-image style="width: 60px; height: 60px" fit="scale-down" :src="row.logoUrl" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="品牌操作">
        <template #="{ row }">
          <el-button type="primary" size="small" icon="Edit" />
          <el-button type="danger" size="small" icon="Delete" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 10, 30]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="changeSize"
      @current-change="changePageNo"
    />
  </el-card>
</template>

<style lang="scss" scoped></style>
