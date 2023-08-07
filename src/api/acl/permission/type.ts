export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 菜单和按钮的数据类型
export interface Permission {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: Permission[]
  select: boolean
}
export interface PermissionResponseData extends ResponseData {
  data: Permission[]
}

// 添加与修改菜单携带参数的数据类型
export interface AddOrUpdateMenuParams {
  id?: number | string
  code: string // 权限标识
  level: number | string // 菜单层级
  name: string // 菜单名
  pid: number | string // 菜单id
}