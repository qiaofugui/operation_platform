import request from '@/utils/request'

import type {
  UserResponseData,
  User
} from './type'

enum API {
  // 获取用户列表
  ALLUSER_URL = '/admin/acl/user/',
  // 添加用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 修改用户
  UPDATEUSER_URL = '/admin/acl/user/update',
}

// 获取用户列表
export function getAllUserAPI(page: number | string, limit: number | string) {
  return request<any, UserResponseData>({
    url: `${API.ALLUSER_URL}${page}/${limit}`,
    method: 'get'
  })
}

// 添加或修改用户
export function addOrUpdateUserAPI(data: User) {
  if (data.id) {
    return request<any, any>({
      url: API.UPDATEUSER_URL,
      method: 'put',
      data
    })
  } else {
    return request<any, any>({
      url: API.ADDUSER_URL,
      method: 'post',
      data
    })
  }
}