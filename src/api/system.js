import request from '@/utils/request'

/** 获取当前区域信息 */
export function getHeadquarters () {
  return request('/api/headquarters/getInfoById', 'get')
}

/** 获取微信设置信息 */
export function getWxSetting () {
  return request('/api/wxsetting/getInfo', 'get')
}

/** 获取微信设置信息 */
export function sendOppenCardSms (phoneNo) {
  const params = {
    phoneNo: phoneNo
  }
  return request('/api/common/sendOpenCardSms', 'post', params)
}
