import Cookies from 'js-cookie'

const Cookie = {
  set (key, value, days = 1) {
    return Cookies.set(key, value, { expires: days })
  },
  // Cookies不设置失效时间，默认退出即失效
  setWithNOExpires (key, value) {
    return Cookies.set(key, value)
  },
  get (key) {
    return Cookies.get(key)
  }
}

export default Cookie
