<template>
<div>
  <!--主体-->
  <div class="weui-content">
    <div class="weui-cells weui-cells_form wy-address-edit">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label wy-lab">姓名</label></div>
        <div class="weui-cell__bd"><input class="weui-input" v-model="formData.name" placeholder="请输入姓名"></div>
      </div>
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd"><label class="weui-label wy-lab">手机号</label></div>
        <div class="weui-cell__bd"><input class="weui-input" :readonly="phoneNoReadOnly" v-model="formData.phoneNo" placeholder="验证码发送至该手机"></div>
        <div class="weui-cell__ft" style="width:150px;">
          <AuthCodeButton @sendAuthCode="getSMScode" :time="timeVal" ref="authcodeButton" />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label wy-lab">验证码</label></div>
        <div class="weui-cell__bd"><input class="weui-input"  v-model="formData.code" placeholder="请输入手机收到的验证码"></div>
      </div>
    </div>
    <div class="weui-btn-area"><div @click="submitData()" class="weui-btn weui-btn_primary">提交</div></div>
  </div>
</div>
</template>

<script>
import AuthCodeButton from '@/components/AuthCodeButton'
import { sendOppenCardSms } from '@/api/system'
import { addMemberInfo } from '@/api/user'
import loading from '@/utils/loading'
import Cookie from '@/utils/cookie'
import Consts from '@/utils/consts'
import Common from '../../utils/common'

export default {
  name: 'index_opencard',
  data () {
    return {
      formData: {
        name: '',
        phoneNo: '',
        code: ''
      },
      timeVal: 120,
      isRun: false,
      phoneNoReadOnly: false
    }
  },
  mounted () {
    let userName = Cookie.get(Consts.COOKIE_KEY_USER_NAME)
    if (!Common.strIsEmpty(userName)) {
      this.phoneNoReadOnly = true
      this.formData.phoneNo = userName
    }
  },
  components: {
    AuthCodeButton
  },
  methods: {
    getSMScode () {
      sendOppenCardSms(this.formData.phoneNo).then(res => {
        let code = res.code
        if (code !== 0 && code !== 303) {
          this.$refs.authcodeButton.reset()
          this.$weui.alert(res.message)
        }
      })
    },
    submitData () {
      loading.show()
      addMemberInfo(this.formData.name, this.formData.phoneNo, this.formData.code).then(res => {
        loading.hide()
        let code = res.code
        if (code !== 0) {
          this.$weui.alert(res.message)
          return
        }
        Cookie.set(Consts.COOKIE_KEY_USER_CARDNO, res.cardNo)
        Cookie.set(Consts.COOKIE_KEY_USER_ID, res.userId)
        Cookie.set(Consts.COOKIE_KEY_USER_NAME, res.userName)
        this.$router.push({ name: 'index_opencard_success' })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.weui-vcode-btn {
  width: 150px;
}
</style>
