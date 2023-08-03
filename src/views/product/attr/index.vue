<script lang="ts" setup>
import { ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { getAttrListAPI } from '@/api/product/attr'

import type { AttrResponseData, AttrValueList } from '@/api/product/attr/type'

const categoryStore = useCategoryStore()

const loading = ref(false)

const attrList = ref<AttrValueList[]>([])
watch(
  () => categoryStore.c3Id,
  () => {
    if(!categoryStore.c3Id) return attrList.value = []
    loading.value = true
    getAttrList()
  }
)
const getAttrList = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const res: AttrResponseData = await getAttrListAPI(c1Id, c2Id, c3Id)
  if (res.code === 200) {
    attrList.value = res.data
    loading.value = false
  } else {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <Category />

    <el-card style="margin: 10px 0">
      <el-button
        type="primary"
        :disabled="categoryStore.c3Id ? false : true"
      >
        <IEpPlus />
        添加属性
      </el-button>
      <el-table
        v-loading="loading"
        element-loading-text="数据正在加载中"
        border
        style="margin: 10px 0"
        :data="attrList"
      >
        <el-table-column
          prop="id"
          label="序号"
          width="80px"
          align="center"
          type="index"
        />
        <el-table-column
          prop="attrName"
          label="属性名称"
          width="120px"
        />
        <el-table-column
          prop="attrValueList"
          label="属性名称值"
        >
          <template #="{ row }">
            <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin: 3px;">{{ item.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="120px"
        >
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click=""
            />
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
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
