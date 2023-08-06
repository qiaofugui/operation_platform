export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface User {
  id?: number | string
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: string
  roleName?: string
}

export interface UserResponseData extends ResponseData {
  data: {
    records: User[]
    total: number
    size: number
    current: number
    pages: number
  }
}

export interface Role {
  id?: number | string
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}
export interface RoleResponseData extends ResponseData {
  data: {
    assignRoles: Role[]
    allRolesList: Role[]
  }
}

// 分配用户角色
export interface SetRole {
  userId: string | number,
  roleIdList: number[]
}