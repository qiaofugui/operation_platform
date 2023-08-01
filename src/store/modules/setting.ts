import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSettingStore = defineStore(
  'setting',
  () => {
    const fold = ref(false)

    const changeFold = () => {
      fold.value = !fold.value
    }

    return {
      fold,
      changeFold,
    }
  },
  {
    persist: [{ paths: ['fold'], storage: localStorage }],
  },
)

export default useSettingStore
