import request from '@/utils/request'

/** 获取产品所有分类 */
export function getCategorys () {
  return request('/api/category/list')
}

/** 获取产品所有分类 */
export function getRecommendCategorys () {
  return request('/api/category/recommendList')
}

/** 获取指定类别指定条数的商品列表 */
export function getGoods (type, count) {
  const params = {
    typeId: type,
    count: count
  }
  return request('/api/goods/getListByType', 'get', params)
}

/** 分页获取指定类别的商品列表 */
export function getPageGoods (type, pageIndex, pageSize = 10) {
  const params = {
    cId: type,
    pageIndex: pageIndex,
    pageSize: pageSize
  }
  return request('/api/goods/getPageList', 'get', params)
}

/** 获取商品详情 */
export function getGoodsInfo (goodsId) {
  const params = {
    goodsId: goodsId
  }
  return request('/api/goods/getGoodsInfo', 'get', params)
}

/** 分页获取指定类别的商品列表 */
export function searchGoods (key, pageIndex, pageSize = 10) {
  const params = {
    key: key,
    pageIndex: pageIndex,
    pageSize: pageSize
  }
  return request('/api/goods/searchByKey', 'get', params)
}
