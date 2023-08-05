<script lang="ts" setup>
import { ref, watch } from "vue";
import useCategoryStore from '@/store/modules/category'

import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'

import { getHasSpuListAPI, deleteSpuAPI, getSkuListAPI } from '@/api/product/spu'
import type { HasSpuResponseData, SpuData, SkuResponseData } from '@/api/product/spu/type'

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
  if (obj.params === 'update') {
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

// 子组件实例
const skuFormRef = ref<any>(null)
// 添加sku按钮
const addSku = (row: SpuData) => {
  scene.value = 2
  skuFormRef.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}

let skuList = ref<SpuData[]>([])
let show  = ref(false)
// 查看sku
const findSku = async (row: SpuData) => {
  const res: SkuResponseData = await getSkuListAPI((row.id as number))
  if (res.code === 200) {
    skuList.value = res.data
    show.value = true
  } else {
    ElMessage.error(res.message)
  }
}

// 删除spu
const deleteSpu = async (row: SpuData) => {
  const res = await deleteSpuAPI((row.id as number))
  if (res.code === 200) {
    ElMessage.success(res.message)
    // 删除后看当前页码的数据是否大于一条，如果大于一条则不用跳转到第一页
    getSpuList(spuList.value.length > 1 ? pageNo.value : 1)
  } else {
    ElMessage.error(res.message)
  }
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
                  @click="addSku(row)"
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
                  @click="findSku(row)"
                />
              </el-tooltip>
              <el-popconfirm
                title="确定要删除吗?"
                icon="DeleteFilled"
                icon-color="#f56c6c"
                @confirm="deleteSpu(row)"
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
        <SkuForm
          ref="skuFormRef"
          @changeScene="changeScene"
        />
      </div>
    </el-card>
  </div>

  <!-- 展示sku -->
  <el-dialog
    v-model="show"
    title="SKU列表"
  >
    <el-table
      border
      :data="skuList"
    >
      <el-table-column
        label="SKU名称"
        prop="skuName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="SKU价格"
        prop="price"
      ></el-table-column>
      <el-table-column
        label="SKU重量"
        prop="weight"
      ></el-table-column>
      <el-table-column label="SKU图片">
        <template #="{ row }">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.skuDefaultImg"
            fit="cover"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
