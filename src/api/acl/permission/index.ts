import request from '@/utils/request'

import type {
  PermissionResponseData,
  AddOrUpdateMenuParams
} from './type.ts'

enum API {
  // 获取全部菜单与按钮标识
  ALLPERMISSION_URL = '/admin/acl/permission',
  // 新增某一级菜单
  ADDMENU_URL = '/admin/acl/permission/save',
  // 更新某一级菜单
  UPDATEMENU_URL = '/admin/acl/permission/update',
}

// 获取全部菜单与按钮标识
export function getAllPermissionAPI() {
  return request<any, PermissionResponseData>({
    url: API.ALLPERMISSION_URL,
    method: 'get',
  })
}

// 新增或更新某一级菜单
export function addOrUpdateMenuAPI(data: AddOrUpdateMenuParams) {
  if (data.id) {
    return request<any, any>({
      url: API.UPDATEMENU_URL,
      method: 'put',
      data
    })
  } else {
    return request<any, any>({
      url: API.ADDMENU_URL,
      method: 'post',
      data
    })
  }
}