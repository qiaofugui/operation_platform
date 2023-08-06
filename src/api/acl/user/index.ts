import request from '@/utils/request'

import type {
  UserResponseData
} from './type'

enum API {
  // 获取用户列表
  ALLUSER_URL = '/admin/acl/user/'
}

// 获取用户列表
export function getAllUserAPI(page: number | string, limit: number | string) {
  return request<any, UserResponseData>({
    url: `${API.ALLUSER_URL}${page}/${limit}`,
    method: 'get'
  })
}