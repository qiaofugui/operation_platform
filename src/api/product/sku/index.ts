import request from '@/utils/request'

import type { SkuResponseData, SkuInfoResponseData } from './type'

enum API {
  // 获取已有商品数据-sku列表
  SKU_URL = '/admin/product/list/',
  // sku 上架
  SKUUP_URL = '/admin/product/onSale/',
  // 下架
  SKUOFF_URL = '/admin/product/cancelSale/',
  // 获取sku商品信息
  SKUINFO_URL = '/admin/product/getSkuInfo/',
}

// 获取已有商品数据-sku列表
export function getSkuListAPI(page: number, limit: number) {
  return request<any, SkuResponseData>({
    url: `${API.SKU_URL}${page}/${limit}`,
    method: 'get',
  })
}

// sku 上架
export function skuUpAPI(skuId: number | string) {
  return request<any, any>({
    url: `${API.SKUUP_URL}${skuId}`,
    method: 'get',
  })
}

// 下架
export function skuOffAPI(skuId: number | string) {
  return request<any, any>({
    url: `${API.SKUOFF_URL}${skuId}`,
    method: 'get',
  })
}

// 获取sku商品信息
export function getSkuInfoAPI(skuId: number | string) {
  return request<any, SkuInfoResponseData>({
    url: `${API.SKUINFO_URL}${skuId}`,
    method: 'get',
  })
}