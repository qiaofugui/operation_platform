//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

//项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from './type'

// 登录
export const loginAPI = (data: loginFormData) => {
  return request<any, loginResponseData>({
    url: API.LOGIN_URL,
    method: 'POST',
    data,
  })
}

// 获取用户信息
export const getUserInfoAPI = () => {
  return request<any, userInfoResponseData>({
    url: API.USERINFO_URL,
    method: 'GET',
  })
}

// 退出
export const logoutAPI = () => {
  return request<any, any>({
    url: API.LOGOUT_URL,
    method: 'POST',
  })
}
