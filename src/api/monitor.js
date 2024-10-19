import request from '@/utils/request'
import Consts from '@/utils/consts'
import Cookie from '@/utils/cookie'

const userId = Cookie.get(Consts.COOKIE_KEY_USER_ID)

/** 添加血压 */
export function addBloodPressure (fromData) {
  fromData.userId = userId
  return request('/api/monitor/addBloodPressure', 'post', fromData)
}

/** 获取血压记录 */
export function getBloodPressure (pageIndex, pageSize) {
  const params = {
    userId: userId,
    pageIndex: pageIndex,
    pageSize: pageSize
  }
  return request('/api/monitor/getBloodPressure', 'post', params)
}

/** 添加血糖 */
export function addBloodGlucose (fromData) {
  fromData.userId = userId
  return request('/api/monitor/addBloodGlucose', 'post', fromData)
}

/** 获取血糖记录 */
export function getBloodGlucose (pageIndex, pageSize) {
  const params = {
    userId: userId,
    pageIndex: pageIndex,
    pageSize: pageSize
  }
  return request('/api/monitor/getBloodGlucose', 'post', params)
}

/** 添加体重 */
export function addWeight (fromData) {
  fromData.userId = userId
  return request('/api/monitor/addWeight', 'post', fromData)
}

/** 获取体重记录 */
export function getUserWeight (pageIndex, pageSize) {
  const params = {
    userId: userId,
    pageIndex: pageIndex,
    pageSize: pageSize
  }
  return request('/api/monitor/getUserWeight', 'post', params)
}

/** 获取柱状图中的血压记录 */
export function getBloodPressureBarChart (activekey1) {
  const params = {
    userId,
    tag: activekey1
  }
  return request('/api/monitor/getBloodPressureBarChart', 'post', params)
}

/** 获取柱状图中的血糖记录 */
export function getBloodGlucoseBarChart (activekey2) {
  const params = {
    userId,
    tag: activekey2
  }
  return request('/api/monitor/getBloodGlucoseBarChart', 'post', params)
}

/** 获取柱状图中的体重记录 */
export function getWeightBarChart (activekey3) {
  const params = {
    userId,
    tag: activekey3
  }
  return request('/api/monitor/getWeightBarChart', 'post', params)
}
