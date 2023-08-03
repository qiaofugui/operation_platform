// 用户相关仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getC1API, getC2API, getC3API } from '@/api/product/attr'

import type { CategoryResponseData, CategoryObj } from '@/api/product/attr/type'

const useCategoryStore = defineStore(
  'category',
  () => {
    // 存储一级分类数据
    const c1List = ref<CategoryObj[]>([])
    const c1Id = ref<number | string>('')
    // 存储二级分类数据
    const c2List = ref<CategoryObj[]>([])
    const c2Id = ref<number | string>('')
    // 存储三级分类数据
    const c3List = ref<CategoryObj[]>([])
    const c3Id = ref<number | string>('')

    const getC1 = async () => {
      const res: CategoryResponseData = await getC1API()
      if (res.code === 200) {
        c1List.value = res.data
      }
    }
    const getC2 = async () => {
      const res: CategoryResponseData = await getC2API(c1Id.value)
      if (res.code === 200) {
        c2List.value = res.data
      }
    }
    const getC3 = async () => {
      const res: CategoryResponseData = await getC3API(c2Id.value)
      if (res.code === 200) {
        c3List.value = res.data
      }
    }

    return {
      c1List,
      c1Id,
      c2List,
      c2Id,
      c3List,
      c3Id,
      getC1,
      getC2,
      getC3
    }
  })

export default useCategoryStore
