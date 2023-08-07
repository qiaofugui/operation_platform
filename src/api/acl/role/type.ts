export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface Role {
  id?: number | string
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}

export interface RoleResponseData extends ResponseData {
  data: {
    records: Role[]
    total: number
    size: number
    current: number
    pages: number
  }
}

// 据id获取菜单和按钮的数据类型
export interface Permission {
  id: number
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