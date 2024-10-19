import weui from 'weui.js'

let loadingView
const loading = {
  show (message = '加载中...') {
    loadingView = weui.loading(message)
  },
  hide () {
    loadingView.hide()
  }
}

export default loading
