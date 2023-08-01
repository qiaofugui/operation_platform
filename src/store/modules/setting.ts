import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSettingStore = defineStore(
  'setting',
  () => {
    const fold = ref(false)
    const refresh = ref(false)

    const changeFold = () => {
      fold.value = !fold.value
    }

    const changeRefresh = () => {
      refresh.value = !refresh.value
    }

    return {
      fold,
      refresh,
      changeFold,
      changeRefresh,
    }
  },
  {
    persist: [{ paths: ['fold'], storage: localStorage }],
  },
)

export default useSettingStore
