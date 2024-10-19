<template>
  <div>
    <div class="remind-page-bg"></div>
    <div class="wx_share_text" v-show="isShareReady">
      <img src="../../assets/images/wx_share_text.png" />
    </div>
    <div class="form-wrapper">
      <div class="form-item">
         <PickerInput
            :pickerData="remindtypePickerData"
            v-model="remindInfo.remindtype"
            @on-labelChange="remindTypeLabelChange" />
      </div>
      <div class="form-item remind-form-item__nborder__npadding">
        <div class="remindnum-wrapper">
          <PickerInput
            :pickerData="remindnumtypePickerData"
            @on-change = "remindnumtypeChange"
            v-model="remindInfo.remindnumtype" />
        </div>
        <div class="remindnum-wrapper">
          <PickerInput
            :pickerData="remindnumPickerData"
            v-model="remindInfo.remindnum" />
        </div>
        <span>次</span>
      </div>
      <div v-if="!isShowWeekPicker">
        <TimePickerInput
          :num="remindInfo.remindnum"
          v-model="remindInfo.timedetails"
          @on-labelChange="lableChange" />
      </div>
      <div v-if="isShowWeekPicker">
        <WeekPickerInput
          :num="remindInfo.remindnum"
          v-model="remindInfo.timedetails"
          @on-labelChange="lableChange" />
      </div>
      <div class="form-item" v-show="!isShowWeekPicker">
        <PickerInput
          :pickerData="reminddaysPickerData"
          labelPrefix="提醒"
          labelSuffix="天"
          v-model="remindInfo.reminddays" />
      </div>
      <div class="form-item" v-show="isShowWeekPicker">
        <PickerInput
          :pickerData="reminddaysPickerData"
          labelPrefix="提醒"
          labelSuffix="周"
          v-model="remindInfo.reminddays" />
      </div>
      <div class="form-item remind-form-item__nborder__lpadding clearfloat">
        <span class="switch-title">提醒其他人</span>
        <div class="switch-wrapper">
          <input class="weui-switch" v-model="isShare" type="checkbox">
        </div>
      </div>
      <div class="btn-wrapper">
        <span @click="addRemind" class="remind-from-btn">{{btnText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { addRemindInfo } from '@/api/remind'
import PickerInput from '@/components/PickerInput'
import TimePickerInput from '@/components/TimePickerInput'
import WeekPickerInput from '@/components/WeekPickerInput'
import loading from '@/utils/loading'
import PickerData from '@/data/pickerdata'
import { getWxSetting } from '@/api/system'
import Cookie from '@/utils/cookie'
import Consts from '@/utils/consts'
import WeChat from '../../utils/wechat'

export default {
  name: 'remind_add_1',
  data () {
    return {
      remindInfo: {
        remindtype: '2',
        remindtypeLabel: '',
        remindnum: 1,
        remindnumtype: '1',
        reminddays: 3,
        timedetails: '',
        timedetailslabel: ''
      },
      systemInfo: null,
      isShare: false,
      remindtypePickerData: PickerData.remindtypePickerData,
      remindnumtypePickerData: PickerData.remindnumtypePickerData,
      remindnumPickerData: PickerData.remindnumPickerData(),
      reminddaysPickerData: PickerData.reminddaysPickerData(),
      isShareReady: false
    }
  },
  components: {
    PickerInput,
    TimePickerInput,
    WeekPickerInput
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getWxSetting().then(res => {
        this.systemInfo = res.info
        WeChat.jsSdk().then(res => {
          WeChat.hideAllNonBaseMenuItem()
        })
      })
    },
    addRemind () {
      loading.show()
      addRemindInfo(this.remindInfo, this.isShare).then(res => {
        loading.hide()
        let _this = this
        var code = res.code
        if (code !== 0) {
          this.$weui.alert(res.message)
          return
        }
        if (this.isShare) {
          this.isShareReady = true
          let remindId = res.remindId
          _this.share(remindId)
        } else {
          this.$router.push({ name: 'remind_list' })
        }
      })
    },
    share (remindId) {
      let url = this.systemInfo.link + this.$router.resolve({ name: 'remind_share', params: { id: remindId } }).href
      let picUrl = this.systemInfo.link + '/img/share_pharmacy.png'
      let userName = Cookie.get(Consts.COOKIE_KEY_USER_WX_NICKNAME)
      let type = this.remindInfo.remindtypeLabel
      let title = '好友' + userName + '为您制定了一份' + type + '测量计划，点击查看计划详情。'
      let desc = '好友' + userName + '表达了对您的关心，特意为您定制了' + type + '测量计划，按时测量并记录下来有助于您向医生反馈和追踪当前健康情况，使医生更加精准的为您制定诊疗方案。'
      WeChat.updateAppMessageShareData(title, desc, url, picUrl)
    },
    remindnumtypeChange () {
      this.remindInfo.timedetails = ''
      this.remindInfo.remindnum = 1
    },
    lableChange (val) {
      this.remindInfo.timedetailslabel = val
    },
    remindTypeLabelChange (val) {
      this.remindInfo.remindtypeLabel = val
    }
  },
  computed: {
    isShowWeekPicker () {
      if (this.remindInfo.remindnumtype === '1') {
        return false
      }
      return true
    },
    btnText () {
      if (this.isShare) {
        return '点击分享'
      }
      return '添加'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/global.less';
.form-wrapper{
  position: relative;
  .rem(width,666);
  margin:10px auto;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  box-shadow:0px 14px 4px 0px rgba(0,46,89,0.2);
  font-family:MicrosoftYaHei;
  .rem(font-size,30);

  .form-item{
    margin-bottom: 10px;
  }

  .spec-input {
    float: right;
    .rem(width,440);
  }

  .dosage-wrapper {
    float: right;
    padding-left: 10px;
    .rem(width,260);
  }

  .remindnum-wrapper {
    float: left;
    padding-right: 10px;
    .rem(width,280);
  }

  .switch-title{
    float: left;
  }

  .switch-wrapper{
    float: left;
    margin-left: 10px;
  }

  .btn-wrapper{
    .rem(margin-top,100);
    .rem(margin-bottom,50);
  }
}
</style>
