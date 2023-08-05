import request from '@/utils/request'

import type { SkuResponseData } from './type'

enum API {
  // 获取已有商品数据-sku列表
  SKU_URL = '/admin/product/list/'
}

// 获取已有商品数据-sku列表
export function getSkuListAPI(page: number, limit: number) {
  return request<any, SkuResponseData>({
    url: `${API.SKU_URL}${page}/${limit}`,
    method: 'get',
  })
}