// 大仓库
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 因为状态管理使用的是setup的方式构建所以我们重写一个$reset并挂载到pinia中
pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state));
  store.$reset = () => {
      store.$patch(initialState);
  }
})

export default pinia
