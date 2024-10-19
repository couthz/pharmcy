import request from '@/utils/request'

export function getBanners (type) {
  return request('/api/banner/getListByType/' + type, 'get')
}

export function getRecommends () {
  const params = {
    count: 4
  }
  return request('/api/goods/getRecommendList', 'get', params)
}

export function getGoods (type) {
  const params = {
    typeId: type,
    count: 4
  }
  return request('/api/goods/getListByType', 'get', params)
}

export function getHomeMenus () {
  return request('/api/homemenu/getList', 'get')
}

export function getAreaInfo (cityName) {
  const params = {
    cityName: cityName
  }
  return request('/api/headquarters/getInfoByCityName', 'get', params)
}
