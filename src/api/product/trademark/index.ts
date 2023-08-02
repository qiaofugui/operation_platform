import request from '@/utils/request'

import type { TradeMarkResponseData, TradeMark } from './type'

enum API {
  // 已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌接口
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌接口
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌接口
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

export const getTrademarkListAPI = (page: number, limit: number) => {
  return request<any, TradeMarkResponseData>({
    url: `${API.TRADEMARK_URL}${page}/${limit}`,
    method: 'GET',
  })
}

// 添加修改品牌
export const addOrUpdateTrademarkAPI = (data: TradeMark) => {
  if (!data.id) {
    return request({
      url: API.ADDTRADEMARK_URL,
      method: 'POST',
      data,
    })
  } else {
    return request({
      url: API.UPDATETRADEMARK_URL,
      method: 'PUT',
      data,
    })
  }
}

// 删除品牌
export const deleteTrademarkAPI = (id: number) => {
  return request({
    url: `${API.DELETETRADEMARK_URL}${id}`,
    method: 'DELETE',
  })
}
