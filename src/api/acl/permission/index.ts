import request from '@/utils/request'

import type {
  PermissionResponseData
} from './type.ts'

enum API {
  // 获取全部菜单与按钮标识
  ALLPERMISSION_URL = '/admin/acl/permission',
}

// 获取全部菜单与按钮标识
export function getAllPermissionAPI() {
  return request<any, PermissionResponseData>({
    url: API.ALLPERMISSION_URL,
    method: 'get',
  })
}