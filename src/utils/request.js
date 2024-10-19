import axios from 'axios'
import Cookie from '@/utils/cookie'
import Consts from '@/utils/consts'
import Qs from 'qs'

const service = axios.create({
  timeout: 50000,
  baseURL: process.env.API_ROOT,
  transformRequest: [function (data) {
    return Qs.stringify(data)
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

service.interceptors.request.use(
  config => {
    const areaId = Cookie.get(Consts.COOKIE_KEY_AREA_ID)
    if (areaId !== null && areaId !== '') {
      config.headers['areaId'] = areaId
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default function request (url, method = 'post', data = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      method
    }
    if (method.toLowerCase() === 'get') {
      options.params = data
    } else {
      options.data = data
    }
    service(options)
      .then(res => {
        console.log('返回数据', res)
        console.log('DATA:', res.data)
        if (res.data.code === 302) {
          let authUrl = res.data.authUrl
          window.location = authUrl
          return
        }
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
        console.error(error)
      })
  })
}
