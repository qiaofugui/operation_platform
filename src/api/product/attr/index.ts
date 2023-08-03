import request from '@/utils/request'

import type { CategoryResponseData } from './type'

enum API {
  // 获取一级分类
  C1_URL = '/admin/product/getCategory1',
  // 获取二级分类
  C2_URL = '/admin/product/getCategory2/',
  // 获取三级分类
  C3_URL = '/admin/product/getCategory3/',
}

// 获取一级分类
export const getC1API = () => {
  return request<any, CategoryResponseData>({
    url: API.C1_URL,
    method: 'GET'
  })
}

// 获取二级分类
export const getC2API = (category1Id: string | number) => {
  return request<any, CategoryResponseData>({
    url: `${API.C2_URL}${category1Id}`,
    method: 'GET'
  })
}

// 获取三级分类
export const getC3API = (category2Id: string | number) => {
  return request<any, CategoryResponseData>({
    url: `${API.C3_URL}${category2Id}`,
    method: 'GET'
  })
}