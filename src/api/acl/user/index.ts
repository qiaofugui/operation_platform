import request from '@/utils/request'

import type {
  UserResponseData,
  User,
  RoleResponseData,
  SetRole
} from './type'

enum API {
  // 获取用户列表
  ALLUSER_URL = '/admin/acl/user/',
  // 添加用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 修改用户
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 根据用户显示角色数据
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  // 根据用户设置角色
  SETROLE_URL = '/admin/acl/user/doAssignRole'
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

// 根据用户显示角色数据
export function getAllRoleAPI(userId: string | number) {
  return request<any, RoleResponseData>({
    url: `${API.ALLROLE_URL}${userId}`,
    method: 'get'
  })
}

// 根据用户设置角色
export function setRoleAPI(data: SetRole) {
  return request<any, any>({
    url: `${API.SETROLE_URL}`,
    method: 'post',
    data
  })
}