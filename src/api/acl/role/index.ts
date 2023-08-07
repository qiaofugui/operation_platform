import request from '@/utils/request'

import type {
  RoleResponseData,
  Role,
  PermissionResponseData
} from './type'

enum API {
  // 获取角色列表
  ROLELIST_URL = '/admin/acl/role/',
  // 新增角色
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新角色
  UPDATEROLE_URL = '/admin/acl/role/update',
  // 批量删除角色
  BATCHDELETEROLE_URL = '/admin/acl/role/batchRemove',
  // 根据id删除角色
  DELETEROLE_URL = '/admin/acl/role/remove/',
  // 根据id获取菜单和按钮的数据
  PERMISSION_URL = '/admin/acl/permission/toAssign/',
  // 给相应的职位分配权限
  SETPERMISSION_URL = '/admin/acl/permission/doAssign'
}

// 获取角色列表
export function getRoleListAPI(page: number | string, limit: number | string, keyword: string) {
  return request<any, RoleResponseData>({
    url: `${API.ROLELIST_URL}${page}/${limit}`,
    method: 'get',
    params: {
      roleName: keyword
    }
  })
}

// 新增角色
export function addOrUpdateRoleAPI(data: Role) {
  if (data.id) {
    return request<any, any>({
      url: API.UPDATEROLE_URL,
      method: 'put',
      data
    })
  } else {
    return request<any, any>({
      url: API.ADDROLE_URL,
      method: 'post',
      data
    })
  }
}

// 批量删除角色
export function batchDeleteRoleAPI(idList: string[] | number[]) {
  return request<any, any>({
    url: API.BATCHDELETEROLE_URL,
    method: 'delete',
    data: idList
  })
}

// 根据id删除角色
export function deleteRoleAPI(id: string | number) {
  return request<any, any>({
    url: `${API.DELETEROLE_URL}${id}`,
    method: 'delete'
  })
}

// 根据id获取菜单和按钮的数据
export function getPermissionAPI(id: string | number) {
  return request<any, PermissionResponseData>({
    url: `${API.PERMISSION_URL}${id}`,
    method: 'get'
  })
}

// 给相应的职位分配权限
export function setPermissionAPI(roleId: string | number, permissionId: string[] | number[]) {
  return request<any, any>({
    url: `${API.SETPERMISSION_URL}?roleId=${roleId}&permissionId=${permissionId}`,
    method: 'post'
  })
}