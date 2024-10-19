<template>
  <div>
    <div class="remind-page-bg"></div>
    <div class="form-wrapper">
      <div class="form-item">
        <input type="text" class="remind-form-item__border"
          v-model="remindInfo.drugname"
          placeholder="请输入药品名称" />
      </div>
      <div class="form-item remind-form-item__border">
        规格（选填）
        <div class="spec-input">
          <input type="text"
            class="item-noborder text-align__right"
            v-model="remindInfo.spec"/>
        </div>
      </div>
      <div class="form-item remind-form-item__nborder__lpadding">
        <span>每次</span>
        <div class="dosage-wrapper">
          <PickerInput :pickerData="dosageunitPickerData" v-model="remindInfo.dosageunit" />
        </div>
        <div class="dosage-wrapper">
          <PickerInput :pickerData="dosagePickerData" v-model="remindInfo.dosage" />
        </div>
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
      <div class="btn-wrapper clearfloat">
        <span @click="upateRemind" class="remind-from-btn update">修改</span>
        <span @click="deleteRemind(remindInfo.id)" class="remind-from-btn delete">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getRemindInfo, updateRemindInfo, deleteRemindInfo } from '../../api/remind'
import PickerInput from '@/components/PickerInput'
import TimePickerInput from '@/components/TimePickerInput'
import WeekPickerInput from '@/components/WeekPickerInput'
import loading from '@/utils/loading'
import PickerData from '@/data/pickerdata'
import WeChat from '../../utils/wechat'
import { getWxSetting } from '@/api/system'
import axios from 'axios'

export default {
  name: 'remind_add_1',
  data () {
    return {
      remindInfo: {},
      systemInfo: {},
      dosagePickerData: PickerData.dosagePickerData(),
      dosageunitPickerData: PickerData.dosageunitPickerData(),
      remindnumtypePickerData: PickerData.remindnumtypePickerData,
      remindnumPickerData: PickerData.remindnumPickerData(),
      reminddaysPickerData: PickerData.reminddaysPickerData(),
      remindNumType: null
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
    /* eslint-disable no-undef */
    init () {
      loading.show()
      let _this = this
      WeChat.jsSdk().then(res => {
        wx.hideAllNonBaseMenuItem()
      })
      let id = this.$route.params.id
      Promise.all(
        [
          getRemindInfo(id),
          getWxSetting()
        ]
      ).then(axios.spread(function (remindRes, sysRes) {
        _this.systemInfo = sysRes.info
        _this.remindInfo = remindRes.info
        _this.remindNumType = _this.remindInfo.remindnumtype
        loading.hide()
      }))
    },
    upateRemind () {
      loading.show()
      updateRemindInfo(this.remindInfo).then(res => {
        loading.hide()
        var code = res.code
        if (code !== 0) {
          this.$weui.alert(res.message)
          return
        }
        this.$router.push({ name: 'remind_list' })
      })
    },
    deleteRemind (id) {
      let _this = this
      this.$weui.confirm('你确定要删除这条提醒记录么?',
        function () {
          loading.show()
          deleteRemindInfo(id).then(res => {
            loading.hide()
            var code = res.code
            if (code !== 0) {
              this.$weui.alert(res.message)
              return
            }
            _this.$router.push({ name: 'remind_list' })
          })
        }
      )
    },
    remindnumtypeChange (val) {
      if (val !== null && this.remindNumType !== null && val !== this.remindNumType) {
        this.remindInfo.timedetails = ''
        this.remindInfo.remindnum = 1
        this.remindNumType = val
      }
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

    .update{
      width: 40%;
      float: left;
    }

    .delete{
      background-color: #DDDDDD;
      color: rgba(1,210,216,1);
      width: 40%;
      float: right;
    }
  }
}
</style>
