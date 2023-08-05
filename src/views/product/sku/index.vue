<script lang="ts" setup>
import { ref, onMounted } from "vue"

import { getSkuListAPI, skuUpAPI, skuOffAPI } from '@/api/product/sku'

import type { SkuResponseData, SkuData } from "@/api/product/sku/type"

let pageNo = ref(1)
let pageSize = ref(5)
let total = ref(0)
let skuList = ref<SkuData[]>([])

// 组件挂载完毕发请求
onMounted(() => {
  getSkuList()
})

const getSkuList = async (page: number = 1) => {
  pageNo.value = page

  const res: SkuResponseData = await getSkuListAPI(pageNo.value, pageSize.value)
  if (res.code === 200) {
    skuList.value = res.data.records
    total.value = res.data.total
  } else {
    ElMessage.error(res.message)
  }
}

// 下拉框改变每页显示条数
const changeSize = () => {
  getSkuList()
}
const changePageNo = (page: number) => {
  getSkuList(page)
}

// 商品上下架操作
const updateSale = async (row: SkuData) => {
  // isSale === 0 未上架; isSale === 1 已上架
  if (row.isSale === 0) {
    const res: any = await skuUpAPI((row.id as number))
    if (res.code !== 200) return ElMessage.error(res.message)
    ElMessage.success(res.message)
    getSkuList(pageNo.value)
  } else {
    const res: any = await skuOffAPI((row.id as number))
    if (res.code !== 200) return ElMessage.error(res.message)
    ElMessage.success(res.message)
    getSkuList(pageNo.value)
  }
}

// 更新sku
const updateSku = () => {
  ElMessage.warning ('功能正在开发中...')
}

</script>

<template>
  <div>
    <el-card>
      <el-table border style="margin: 10px 0;" :data="skuList">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="名称" width="150px" prop="skuName"></el-table-column>
        <el-table-column label="描述" prop="skuDesc" min-width="300"></el-table-column>
        <el-table-column label="默认图片" width="150px">
          <template #="{ row }">
            <el-image style="width: 100%; height: 100%" fit="scale-down" :src="row.skuDefaultImg" />
          </template>
        </el-table-column>
        <el-table-column label="重量(克)" prop="weight" width="150px"></el-table-column>
        <el-table-column label="价格(元)" prop="price" width="150px"></el-table-column>
        <el-table-column label="操作" width="260px" fixed="right">
          <template #="{ row }">
            <el-tooltip effect="dark" :content="row.isSale === 0 ? '上线' : '下线'" placement="bottom">
              <el-button :type="row.isSale === 0 ? 'success' : 'info'" :icon="row.isSale === 0 ? 'Top' : 'Bottom'"
                size="small" @click="updateSale(row)" />
            </el-tooltip>
            <el-tooltip effect="dark" content="编辑" placement="bottom">
              <el-button type="primary" icon="Edit" size="small" @click="updateSku" />
            </el-tooltip>
            <el-tooltip effect="dark" content="信息" placement="bottom">
              <el-button type="info" icon="InfoFilled" size="small" />
            </el-tooltip>
            <el-popconfirm :title="`确定要删除${row}`" icon="DeleteFilled" icon-color="#f56c6c" @confirm="">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete" />
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 10, 25, 50]"
        :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @size-change="changeSize"
        @current-change="changePageNo" />
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
