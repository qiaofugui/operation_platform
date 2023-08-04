<script lang="ts" setup>
import { ref, watch } from "vue";
import useCategoryStore from '@/store/modules/category'

import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'

import { getHasSpuListAPI } from '@/api/product/spu'
import type { HasSpuResponseData, SpuData } from '@/api/product/spu/type'

const categoryStore = useCategoryStore()

let scene = ref(0)

// 分页器默认页码
let pageNo = ref(1)
// 分页器默认每页条数
let pageSize = ref(3)
// 分页器默认总条数
let total = ref(0)

let spuList = ref<SpuData[]>([])
const loading = ref(false)

watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return (spuList.value = [])
    getSpuList()
  }
)
const getSpuList = async (page: number = 1) => {
  pageNo.value = page

  loading.value = true
  const res: HasSpuResponseData = await getHasSpuListAPI(pageNo.value, pageSize.value, categoryStore.c3Id)
  if (res.code === 200) {
    spuList.value = res.data.records
    total.value = res.data.total
    loading.value = false
  } else {
    loading.value = false
  }
}
const changePageNo = (page: number) => {
  getSpuList(page)
}
// 下拉框改变每页显示条数
const changeSize = () => {
  getSpuList()
}

// 场景0添加SPU按钮
const addSpu = () => {
  scene.value = 1
  spuFormRef.value.initAddSpu(categoryStore.c3Id)
}

// 子组件自定义事件通知父组件改变场景
const changeScene = (obj: any) => {
  scene.value = obj.flag
  if(obj.params === 'update') {
    // 更新留在当前页
    getSpuList(pageNo.value)
  } else {
    // 添加回到第一页
    getSpuList()
  }
}

// 子组件实例
const spuFormRef = ref<any>(null)
// 场景1修改SPU按钮
const updateSpu = (row: SpuData) => {
  scene.value = 1
  spuFormRef.value.initSpuData(row)
}

</script>

<template>
  <div>
    <Category :scene="scene" />

    <el-card style="margin: 10px 0">
      <div v-show="scene === 0 ? true : false">
        <el-button
          type="primary"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addSpu"
        >
          <IEpPlus />
          添加属性
        </el-button>
        <el-table
          style="margin: 10px 0;"
          border
          v-loading="loading"
          :data="spuList"
        >
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
            prop="id"
          ></el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作">
            <template #="{ row }">
              <el-tooltip
                effect="dark"
                content="添加SKU"
                placement="bottom"
              >
                <el-button
                  type="primary"
                  size="small"
                  icon="Plus"
                />
              </el-tooltip>
              <el-tooltip
                effect="dark"
                content="修改SPU"
                placement="bottom"
              >
                <el-button
                  type="success"
                  size="small"
                  icon="Edit"
                  @click="updateSpu(row)"
                />
              </el-tooltip>
              <el-tooltip
                effect="dark"
                content="查看SPU列表"
                placement="bottom"
              >
                <el-button
                  type="info"
                  size="small"
                  icon="View"
                />
              </el-tooltip>
              <el-popconfirm
                title="确定要删除吗?"
                icon="DeleteFilled"
                icon-color="#f56c6c"
                @confirm=""
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                  />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
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
      </div>
      <!-- 添加SPU|修改SPU的子组件 -->
      <div v-show="scene === 1 ? true : false">
        <SpuForm
          ref="spuFormRef"
          @changeScene="changeScene"
        />
      </div>
      <!-- 添加SKU的子组件 -->
      <div v-show="scene === 2 ? true : false">
        <SkuForm @changeScene="changeScene" />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
