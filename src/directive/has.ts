// 按钮权限的实现
import pinia from '@/store'
import useUserStore from '@/store/modules/user'

export const isHasButton = (app: any) => {
  // 自定义指令
  app.directive('has', {
    mounted(el: any, options: any) {
      const userStore = useUserStore(pinia)
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    }
  })
}