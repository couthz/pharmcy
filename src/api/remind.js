import request from '@/utils/request'
import Consts from '@/utils/consts'
import Cookie from '@/utils/cookie'

const userId = Cookie.get(Consts.COOKIE_KEY_USER_ID)

/** 注册 */
export function register (phoneNumber, authCode) {
  let params = {
    phoneNumber,
    authCode
  }
  return request('/api/remind/register', 'post', params)
}

/** 根据ID获取remindInfo信息 */
export function getRemindInfo (id) {
  let params = {
    remindId: id
  }
  return request('/api/remind/getRemindInfo', 'post', params)
}

/** 添加新的提醒 */
export function addRemindInfo (params, isShare) {
  params.userId = userId
  params.isShare = isShare
  return request('/api/remind/addRemind', 'post', params)
}

/** 修改提醒 */
export function updateRemindInfo (params) {
  params.userId = userId
  return request('/api/remind/updateRemind', 'post', params)
}

/** 删除提醒 */
export function deleteRemindInfo (id) {
  let params = {
    userId,
    remindId: id
  }
  return request('/api/remind/deleteRemind', 'post', params)
}

/** 获取所有提醒列表 */
export function getRemindList (status = '') {
  let params = {
    userId,
    status
  }
  return request('/api/remind/getUserRemindInfo', 'post', params)
}

/** 修改提醒记录状态 */
export function changeInfoStatus (status, remindInfoId) {
  let params = {
    userId,
    status,
    remindInfoId
  }
  return request('/api/remind/changeInfoStatus', 'post', params)
}

/** 获取分享相关记录 */
export function getShareInfo (shareId) {
  let params = {
    userId,
    shareId
  }
  return request('/api/remind/getShareInfo', 'post', params)
}

/** 接受分享提醒 */
export function acceptShare (shareId) {
  let params = {
    userId,
    shareId
  }
  return request('/api/remind/acceptShare', 'post', params)
}
