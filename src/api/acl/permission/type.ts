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