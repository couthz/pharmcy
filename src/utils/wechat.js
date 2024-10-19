import request from '@/utils/request'
import Common from './common'
import Cookie from './cookie'
import Consts from './consts'

/* eslint-disable no-undef */
const WeChat = {
  isIOS () {
    var isIphone = navigator.userAgent.includes('iPhone')
    var isIpad = navigator.userAgent.includes('iPad')
    return isIphone || isIpad
  },
  jsSdk () {
    return new Promise((resolve, reject) => {
      let url = Cookie.get(Consts.COOKIE_KEY_IOS_WX_JSSDK_AUTH_PAGE)
      console.info('WX-JS-SDK Config 页面URL:', url)
      // alert('WX-JS-SDK Config 页面URL:' + url)
      const params = {
        url: url
      }
      request('/api/wechat/getJsSdkConfig', 'get', params).then(res => {
        if (res.code === 0) {
          wx.config({
            debug: false,
            appId: res.appId,
            timestamp: res.timestamp,
            nonceStr: res.nonceStr,
            signature: res.signature,
            jsApiList: [
              'updateAppMessageShareData',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem'
            ]
          })
          wx.error(function (res) {
            console.error('WX-JS-SDK Config ERROR:', res)
          })
          wx.ready(function () {
            resolve()
          })
        }
      }).catch(error => {
        reject(error)
        console.error(error)
      })
    })
  },
  updateAppMessageShareData (title, desc, url, picUrl) {
    wx.ready(function () {
      wx.updateAppMessageShareData({
        title: title,
        desc: desc,
        link: url,
        imgUrl: picUrl,
        success: function () {
          wx.showAllNonBaseMenuItem()
        }
      })
    })
  },
  hideAllNonBaseMenuItem () {
    wx.ready(function () {
      wx.hideAllNonBaseMenuItem()
    })
  },
  showAllNonBaseMenuItem () {
    wx.ready(function () {
      wx.showAllNonBaseMenuItem()
    })
  },
  setUrl (url) {
    if (this.isIOS()) {
      /** 记录第一次进入时的链接，iOS 分享时需要用到 */
      let iosUrl = Cookie.get(Consts.COOKIE_KEY_IOS_WX_JSSDK_AUTH_PAGE)
      if (Common.strIsEmpty(iosUrl)) {
        Cookie.setWithNOExpires(Consts.COOKIE_KEY_IOS_WX_JSSDK_AUTH_PAGE, url)
      }
    } else {
      Cookie.setWithNOExpires(Consts.COOKIE_KEY_IOS_WX_JSSDK_AUTH_PAGE, url)
    }
  },
  share (title, desc, url, picUrl) {
    this.jsSdk().then(res => {
      this.hideAllNonBaseMenuItem()
      this.updateAppMessageShareData(title, desc, url, picUrl)
    })
  }
}

export default WeChat
