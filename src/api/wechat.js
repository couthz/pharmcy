import request from '@/utils/request'

/** 授权信息 */
export function auth (code, state) {
  const params = {
    code: code,
    state: state
  }
  return request('/api/wechat/auth', 'get', params)
}
