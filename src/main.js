import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import VueWeChatTitle from 'vue-wechat-title'
import FastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import weui from 'weui.js'
import 'weui'
import '@/assets/css/style.css'
import 'lib-flexible/flexible.js'

Vue.prototype.$weui = weui

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueWeChatTitle)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
