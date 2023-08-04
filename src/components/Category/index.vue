<script lang="ts" setup>
import { onMounted } from 'vue'

import useCategoryStore from '@/store/modules/category'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getC1()
})

const handler1 = () => {
  // 清空二级三级分类
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3List = []

  categoryStore.getC2()
}
const handler2 = () => {
  categoryStore.c3Id = ''

  categoryStore.getC3()
}

defineProps({
  scene: {
    type: Number,
  }
})

</script>

<template>
  <el-card>
    <el-form :inline="true">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="一级分类">
            <el-select
              v-model="categoryStore.c1Id"
              @change="handler1"
              :disabled="scene !== 0"
            >
              <el-option
                v-for="item in categoryStore.c1List"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="二级分类">
            <el-select
              v-model="categoryStore.c2Id"
              @change="handler2"
              :disabled="scene !== 0"
            >
              <el-option
                v-for="item in categoryStore.c2List"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="三级分类">
            <el-select
              v-model="categoryStore.c3Id"
              :disabled="scene !== 0"
            >
              <el-option
                v-for="item in categoryStore.c3List"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>
