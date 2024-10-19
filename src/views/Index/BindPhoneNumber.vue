<template>
  <div class="content">
    <div class="remind-page-bg"></div>
    <div class="form-wrapper">
      <div class="form-item clearfloat">
        <span>手机号</span>
        <div class="phoneno">
          <input type="text" class="remind-form-item__border"
            v-model="phoneNumber"
            placeholder="请输入您的手机号" />
        </div>
      </div>
      <div class="form-item clearfloat">
        <span>验证码</span>
        <div class="authcode">
          <input type="text" class="remind-form-item__border"
            v-model="authCode"
            placeholder="请输入您的验证码" />
        </div>
        <div class="authbtn">
          <AuthCodeButton @sendAuthCode="getSMScode" btnClass="btnClass" content="获取验证码" :time="timeVal" ref="authcodeButton" />
        </div>
      </div>
      <div class="message">绑定手机号便于为您提供更优质的服务</div>
      <div class="btn-wrapper">
        <span @click="register" class="remind-from-btn">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '@/api/remind'
import Common from '@/utils/common'
import loading from '@/utils/loading'
import Cookie from '@/utils/cookie'
import Consts from '@/utils/consts'
import AuthCodeButton from '@/components/AuthCodeButton'
import { sendOppenCardSms } from '@/api/system'

export default {
  name: 'bind_phonenumber',
  data () {
    return {
      phoneNumber: '',
      authCode: '',
      timeVal: 120
    }
  },
  components: {
    AuthCodeButton
  },
  methods: {
    register () {
      if (Common.strIsEmpty(this.phoneNumber)) {
        this.$weui.alert('手机号码不能为空')
        return
      }
      if (Common.strIsEmpty(this.authCode)) {
        this.$weui.alert('验证码不能为空')
        return
      }
      loading.show()
      register(this.phoneNumber, this.authCode).then(res => {
        loading.hide()
        console.log(res)
        if (res.code !== 0) {
          this.$weui.alert(res.message)
          this.phoneNumber = null
          this.authCode = null
          return
        }
        Cookie.set(Consts.COOKIE_KEY_USER_ID, res.userId)
        Cookie.set(Consts.COOKIE_KEY_USER_NAME, res.userName)
        this.$weui.alert('手机号码绑定成功', () => {
          this.$router.push({ name: 'remind_list' })
        })
      })
    },
    getSMScode () {
      sendOppenCardSms(this.phoneNumber).then(res => {
        let code = res.code
        if (code !== 0 && code !== 303) {
          this.$refs.authcodeButton.reset()
          this.$weui.alert(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/global.less';
.content {
  padding: 10px;
  box-sizing: content-box;
}
.form-wrapper{
  border-radius: 10px;
  box-sizing: content-box;
  .rem(padding,30);
  background-color: #fff;
  box-shadow:0px 14px 4px 0px rgba(0,46,89,0.2);
  font-family:MicrosoftYaHei;
  font-weight:400;
  .rem(font-size,30);

  .form-item{
    margin-bottom: 10px;
    width: 100%;
    span {
      float: left;
      line-height: 33px;
      .rem(width,100);
      color:rgba(34,34,34,1);
    }
    .authbtn {
      float: right;
      line-height: 33px;
    }
    .phoneno {
      .rem(width,543);
      .rem(margin-left,110);
    }
    .authcode {
      float: left;
      .rem(width,310);
      .rem(margin-left,10);
    }
  }

  .message {
    color:rgba(1,210,216,1);
    margin: auto;
    .rem(margin-top,230);
    text-align: center;
  }

  .btn-wrapper{
    .rem(margin-top,20);
    .rem(margin-bottom,50);
  }

  .btnClass {
    .rem(width,215);
    .rem(height,65);
    background:rgba(1,210,216,1);
    border-radius:10px;
    color:rgba(255,255,255,1);
  }
}
</style>
