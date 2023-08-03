import request from '@/utils/request'

import type { CategoryResponseData, AttrResponseData, AttrValue } from './type'

enum API {
  // 获取一级分类
  C1_URL = '/admin/product/getCategory1',
  // 获取二级分类
  C2_URL = '/admin/product/getCategory2/',
  // 获取三级分类
  C3_URL = '/admin/product/getCategory3/',
  // 获取属性列表
  ATTR_URL = '/admin/product/attrInfoList/',
  // 添加或修改属性
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
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

// 获取属性列表
export const getAttrListAPI = (category1Id: string | number, category2Id: string | number, category3Id: string | number) => {
  return request<any, AttrResponseData>({
    url: `${API.ATTR_URL}${category1Id}/${category2Id}/${category3Id}`,
    method: 'GET'
  })
}

// 添加或修改属性
export const addOrUpdateAttrAPI = (data: AttrValue) => {
  return request<any, any>({
    url: API.ADDORUPDATEATTR_URL,
    method: 'POST',
    data
  })
}