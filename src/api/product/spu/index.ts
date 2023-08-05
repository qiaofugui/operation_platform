import request from '@/utils/request'

import type {
  HasSpuResponseData,
  TradeMarkResponseData,
  SpuImageResponseData,
  SpuSaleAttrResponseData,
  SaleAttrResponseData,
  SpuData
} from './type'

enum API {
  // 获取已有spu列表
  HASSPU_URL = '/admin/product/',
  // 获取所有品牌列表
  ALLTRaDEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个sku的图片列表
  IMAGE_URL = '/admin/product/spuImageList/',
  // 某个 spu 销售属性
  SPUSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取所有销售属性列表
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 添加新的spu
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  // 更新spu
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  // 删除spu
  DELETESPU_URL = '/admin/product/deleteSpu/'
}

// 获取已有spu列表
export function getHasSpuListAPI(page: number, limit: number, category3Id: string | number) {
  return request<any, HasSpuResponseData>({
    url: `${API.HASSPU_URL}/${page}/${limit}?category3Id=${category3Id}`,
    method: 'get',
  })
}

// 获取所有品牌列表
export function getAllTrademarkAPI() {
  return request<any, TradeMarkResponseData>({
    url: API.ALLTRaDEMARK_URL,
    method: 'get',
  })
}

// 获取某个sku的图片列表
export function getSpuImageListAPI(spuId: string | number) {
  return request<any, SpuImageResponseData>({
    url: `${API.IMAGE_URL}${spuId}`,
    method: 'get',
  })
}

// 某个 spu 销售属性
export function getSpuSaleAttrListAPI(spuId: string | number) {
  return request<any, SpuSaleAttrResponseData>({
    url: `${API.SPUSALEATTR_URL}${spuId}`,
    method: 'get',
  })
}

// 获取所有销售属性列表
export function getAllSaleAttrAPI() {
  return request<any, SaleAttrResponseData>({
    url: API.ALLSALEATTR_URL,
    method: 'get',
  })
}

// 添加或更新spu
export function addOrUpdateSpuAPI(data: SpuData) {
  if (!data.id) {
    return request<any, any>({
      url: API.ADDSPU_URL,
      method: 'post',
      data,
    })
  } else {
    return request<any, any>({
      url: API.UPDATESPU_URL,
      method: 'post',
      data,
    })
  }
}

// 删除spu
export function deleteSpuAPI(spuId: string | number) {
  return request<any, any>({
    url: `${API.DELETESPU_URL}${spuId}`,
    method: 'delete',
  })
}