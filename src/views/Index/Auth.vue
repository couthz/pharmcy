<template>
<div>
  <img src="../../assets/images/page_logo.png" class="location" />
  <loading :show="showloading" class="loading" :message="message"></loading>
  <!--底部版权-->
  <div class="page footer js_show">
    <div class="page__bd page__bd_spacing">
        <div class="weui-footer weui-footer_fixed-bottom">
            <p class="weui-footer__links">
                <a href="javascript:void();" class="weui-footer__link">健康科技版权所有</a>
            </p>
            <p class="weui-footer__text">Copyright © 2019 sinohealthtec.com</p>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import { auth } from '@/api/wechat'
import Cookie from '@/utils/cookie'
import Consts from '../../utils/consts'
import Common from '@/utils/common'

/* eslint-disable no-undef */
export default {
  name: 'index',
  data () {
    return {
      showloading: true,
      message: '微信正在登录中，请稍后...'
    }
  },
  components: { Loading },
  mounted () {
    var code = this.$route.query.code
    if (!Common.strIsEmpty(code)) {
      this.wechatAuth(code)
    }
  },
  methods: {
    wechatAuth (code) {
      auth(code).then(res => {
        Cookie.set(Consts.COOKIE_KEY_USER_ID, res.userId)
        Cookie.set(Consts.COOKIE_KEY_USER_NAME, res.userName)
        Cookie.set(Consts.COOKIE_KEY_USER_OPPENID, res.oppenId)
        Cookie.set(Consts.COOKIE_KEY_USER_CARDNO, res.cardnumber)
        Cookie.set(Consts.COOKIE_KEY_USERINFO, res.userInfo)
        Cookie.set(Consts.COOKIE_KEY_USER_WX_NICKNAME, res.userInfo.nickname)

        let pagePath = Cookie.get(Consts.COOKIE_KEY_CURR_PAGE)

        /** 所有的修改页面要重新定位到对应的主页 */
        if (pagePath === 'remind_update_1' || pagePath === 'remind_update_2') {
          pagePath = '/remind/list'
        }

        if (!Common.strIsEmpty(pagePath)) {
          location.replace(pagePath)
        } else {
          location.replace('/home/index')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.rem(@name,@px) {
    @{name}: unit(@px / 75, rem);
 }
.location {
  width:144px;
  height: 143px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -72px;
  margin-top: -72px;
}
.loading {
  width: 100%;
  position: fixed;
  top: 30px;
}
</style>
