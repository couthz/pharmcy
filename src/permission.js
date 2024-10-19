import router from './router'
import Cookie from './utils/cookie'
import Consts from './utils/consts'
import Common from '@/utils/common'
import BaiDu from '@/utils/baidu'
import WeChat from './utils/wechat'
import { getAreaInfo } from '@/api/index'
import { getWxSetting } from './api/system'

router.beforeEach((to, from, next) => {
  const areaId = Cookie.get(Consts.COOKIE_KEY_AREA_ID)

  // console.log('to', to)
  // console.log('from', from)

  if (from.path === '/') {
    Cookie.set(Consts.COOKIE_KEY_IOS_WX_JSSDK_AUTH_PAGE, null)
  }

  if (to.name === 'index_auth') {
    next()
    return
  }

  Cookie.set(Consts.COOKIE_KEY_CURR_PAGE, to.fullPath)

  if (to.path.indexOf('/remind') >= 0) {
    let userName = Cookie.get(Consts.COOKIE_KEY_USER_NAME)
    let oppenId = Cookie.get(Consts.COOKIE_KEY_USER_OPPENID)
    if (Common.strIsEmpty(userName) && !Common.strIsEmpty(oppenId)) {
      next({ name: 'index_bind_phonenumber' })
    } else {
      next()
    }
    return
  }

  const cardNo = Cookie.get(Consts.COOKIE_KEY_USER_CARDNO)
  if (to.path.indexOf('/mine') >= 0) {
    if (Common.strIsEmpty(cardNo)) {
      next({ name: 'index_opencard' })
      return
    }
  }

  if (to.path.indexOf('/opencard') >= 0) {
    if (!Common.strIsEmpty(cardNo)) {
      next({ name: 'home_mine' })
      return
    }
  }

  if (Common.strIsEmpty(areaId)) {
    BaiDu.location().then(res => {
      getAreaInfo(res).then(response => {
        Cookie.set(Consts.COOKIE_KEY_AREA_ID, response.areaId)
        Cookie.set(Consts.COOKIE_KEY_AREA_NAME, response.areaName)
        next()
      })
    })
    return
  }
  next()
})

router.afterEach((to, from) => {
  /** 微信分享功能url授权 */
  if (to.name !== 'index_auth') {
    getWxSetting().then(res => {
      let baseUrl = res.info.link
      let url = baseUrl + to.fullPath
      WeChat.setUrl(url)
    })
  }
})
