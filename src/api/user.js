import request from '@/utils/request'
import Consts from '@/utils/consts'
import Cookie from '@/utils/cookie'

const userId = Cookie.get(Consts.COOKIE_KEY_USER_ID)

/** 获取用户信息 */
export function getUserInfo () {
  const params = {
    userId: userId
  }
  return request('/api/user/getUserInfo', 'get', params)
}

/** 获取用户信息，包括海典数据 */
export function getUserInfoAndHaiDian () {
  const params = {
    userId: userId
  }
  return request('/api/user/getUserInfoAndHaidian', 'get', params)
}

/** 获取用户消费记录 */
export function getConsumptionDetails (pageIndex, pageSize) {
  const params = {
    userId: userId,
    pageIndex: pageIndex,
    pageSize: pageSize
  }
  return request('/api/user/getConsumptionDetails', 'get', params)
}

/** 获取用户积分记录 */
export function getIntegralDetails (pageIndex, pageSize) {
  const params = {
    userId: userId,
    pageIndex: pageIndex,
    pageSize: pageSize
  }
  return request('/api/user/getIntegralDetails', 'get', params)
}

/** 会员开卡 */
export function addMemberInfo (name, phoneNo, code) {
  const params = {
    userId: userId,
    cardholder: name,
    handset: phoneNo,
    code: code
  }
  return request('/api/member/addMemberInfo', 'post', params)
}
