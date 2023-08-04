import request from '@/utils/request'

import type { HasSpuResponseData } from './type'

enum API {
  // 获取已有spu列表
  HASSPU_URL = '/admin/product/'
}

// 获取已有spu列表
export function getHasSpuListAPI(page: number, limit: number, category3Id: string | number) {
  return request<any, HasSpuResponseData>({
    url: `${API.HASSPU_URL}/${page}/${limit}?category3Id=${category3Id}`,
    method: 'get',
  })
}
