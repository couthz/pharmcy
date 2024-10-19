<template>
  <div class="wrapper">
    <div class="remind-page-bg"></div>
    <div class="wrapper-time clearfloat">
      <div class="left">
        <span>日期</span>
        <div class="date-picker" @click="datepicker"> {{timeLabel}} </div>
      </div>
      <div class="right">
        <span>时间</span>
        <div class="time-picker">
          <PickerInput2 :pickerData1="pickerData1" :pickerData2="pickerData2" v-model="formData.addTime" />
        </div>
      </div>
    </div>
    <div class="form-wrapper">
      <div class="form-item-1">
        <span>体重</span>
        <span class="unit">(kg)</span>
        <input type="text" class="weight-input__border"
          v-model="formData.weight"
          placeholder="请输入您的体重" />
      </div>
      <div class="btn-wrapper">
        <span @click="addMonitor" class="remind-from-btn">添加</span>
      </div>
    </div>
  </div>
</template>

<script>
import { addWeight } from '@/api/monitor'
import PickerInput2 from '@/components/PickerInput2'
import Common from '@/utils/common'
import loading from '@/utils/loading'
import MonitorPickerData from '@/data/monitorpickerdata'
import { getWxSetting } from '@/api/system'

export default {
  name: 'monitor_addweight',
  data () {
    return {
      formData: {
        addDate: initAddDate(),
        addTime: initAddTime(),
        weight: ''
      },
      pickerData1: MonitorPickerData.HourData,
      pickerData2: MonitorPickerData.MinutesData
    }
  },
  components: {
    PickerInput2
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getWxSetting().then(res => {
        this.systemInfo = res.info
      })
    },
    datepicker () {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let date = new Date().getDate()
      let defaultValue = [year, month, date]
      let self = this

      let dateTmp = new Date()
      dateTmp.setDate(dateTmp.getDate() - 7)
      let start = new Date(dateTmp)

      this.$weui.datePicker({
        start: start,
        end: new Date(),
        defaultValue: defaultValue,
        onConfirm: function (result) {
          self.formData.addDate = result[0].value + ',' + result[1].value + ',' + result[2].value
        }
      })
    },
    addMonitor () {
      if (Common.strIsEmpty(this.formData.weight)) {
        this.$weui.topTips('体重值不能为空')
        return
      }
      if (Common.isNumber(this.formData.weight)) {
        this.$weui.topTips('体重值必须为数值')
        return
      }
      loading.show()
      addWeight(this.formData).then(res => {
        loading.hide()
        let code = res.code
        if (code !== 0) {
          this.$weui.alert(res.message)
          return
        }
        this.$router.push({ name: 'monitor_weightlist' })
      })
    }
  },
  computed: {
    timeLabel () {
      if (Common.strIsEmpty(this.formData.addDate)) {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let date = new Date().getDate()
        let defaultValue = [year, month, date]
        return defaultValue[0] + '年' + defaultValue[1] + '月' + defaultValue[2] + '日'
      } else {
        let defaultValue = this.formData.addDate.split(',')
        return defaultValue[0] + '年' + defaultValue[1] + '月' + defaultValue[2] + '日'
      }
    }
  }
}

function initAddDate () {
  let year = new Date().getFullYear()
  let month = new Date().getMonth() + 1
  let date = new Date().getDate()
  return year + ',' + month + ',' + date
}

function initAddTime () {
  let hour = new Date().getHours()
  let minute = new Date().getMinutes()
  return hour + ',' + minute
}

</script>

<style lang="less" scoped>
@import '../../assets/css/global.less';

.wrapper{
  .rem(font-size,30);
  .wrapper-time{
    .rem(margin-top,50);
    .rem(margin-left,25);
    .rem(margin-right,25);
    .left{
      float: left;
      span{
        padding-left: 10px;
        font-family:MicrosoftYaHeiLight;
        font-weight:300;
        color:rgba(255,255,255,1);
      }
      .date-picker{
        .rem(height,46);
        .rem(line-height,46);
        .rem(padding-left,10);
        .rem(padding-right,10);
        border:1px solid #FFFFFF;
        border-radius: 10px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color:#FFFFFF;
        .rem(margin-top,5);
      }
    }
    .right{
      float: right;
      span{
        padding-left: 10px;
        font-family:MicrosoftYaHeiLight;
        font-weight:300;
        color:rgba(255,255,255,1);
      }
      .time-picker{
        .rem(height,46);
        .rem(width,200);
        .rem(line-height,46);
        .rem(padding-left,10);
        .rem(padding-right,10);
        border:1px solid #FFFFFF;
        border-radius: 10px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color:#FFFFFF;
        text-align: center;
        .rem(margin-top,5);
      }
    }
  }
  .form-wrapper{
    .rem(width,666);
    margin:10px auto;
    .rem(margin-top,30);
    border-radius: 10px;
    padding: 10px;
    .rem(padding-top,40);
    background-color: #fff;
    box-shadow:0px 14px 4px 0px rgba(0,46,89,0.2);
    font-family:MicrosoftYaHei;
    .rem(font-size,30);

    .form-item-1{
      .rem(margin-top,50);
      .rem(height,70);
      .rem(line-height,70);
      .rem(padding-left,20);
      border-bottom:1px solid #DDDDDD;
      color: #01D2DB;

      .unit{
        float: right;
      }

      input{
        .rem(width,300);
        text-align: right;
        float: right;
        .rem(height,70);
        .rem(line-height,70);
      }
    }

    .btn-wrapper{
      .rem(margin-top,260);
      .rem(margin-bottom,50);
    }
  }
}
</style>
