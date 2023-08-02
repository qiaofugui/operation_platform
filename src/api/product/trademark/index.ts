import request from '@/utils/request'

import type { TradeMarkResponseData } from './type'

enum API {
  // 已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

export const getTrademarkListAPI = (page: number, limit: number) => {
  return request<any, TradeMarkResponseData>({
    url: `${API.TRADEMARK_URL}${page}/${limit}`,
    method: 'GET',
  })
}
