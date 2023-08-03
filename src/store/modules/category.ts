// 用户相关仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getC1API, getC2API, getC3API } from '@/api/product/attr'

const useCategoryStore = defineStore(
  'category',
  () => {
    // 存储一级分类数据
    const c1List = ref([])
    const c1Id = ref<number | string>('')
    // 存储二级分类数据
    const c2List = ref([])
    const c2Id = ref<number | string>('')
    // 存储三级分类数据
    const c3List = ref([])
    const c3Id = ref<number | string>('')

    const getC1 = async () => {
      const res: any = await getC1API()
      if (res.code === 200) {
        c1List.value = res.data
      }
    }
    const getC2 = async (id: number | string) => {
      const res: any = await getC2API(id)
      if (res.code === 200) {
        c2List.value = res.data
      }
    }
    const getC3 = async (id: number | string) => {
      const res: any = await getC3API(id)
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
