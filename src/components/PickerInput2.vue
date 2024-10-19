<template>
  <div>
    <div class="time-picker" @click="picker">{{currLabels}}</div>
  </div>
</template>

<script>
import weui from 'weui.js'
import Common from '@/utils/common'

export default {
  name: 'PickerInput2',
  data () {
    return {
      currValues: [],
      currLabels: ''
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    pickerData1: {
      type: Array
    },
    pickerData2: {
      type: Array
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      console.info('==================this.value:' + this.value)
      this.currValues = []
      if (Common.strIsEmpty(this.value)) {
        this.currValues.push(this.pickerData1[0].value)
        this.currValues.push(this.pickerData2[0].value)
      } else {
        this.currValues = this.value.split(',')
      }

      var label = ''
      this.pickerData1.forEach(element => {
        if (element.value === this.currValues[0]) {
          label += element.label + ' '
        }
      })
      this.pickerData2.forEach(element => {
        if (element.value === this.currValues[1]) {
          label += element.label
        }
      })
      this.currLabels = label
    },
    picker () {
      let curr = this
      let defaultVal = []
      this.currValues.forEach(e => {
        defaultVal.push(e)
      })
      weui.picker(
        this.pickerData1,
        this.pickerData2,
        {
          id: 'picker_2_' + Math.random(),
          defaultValue: defaultVal,
          onConfirm (result) {
            curr.currValues = []
            curr.currValues.push(result[0].value)
            curr.currValues.push(result[1].value)
            let labels = result[0].label + result[1].label
            curr.currLabels = labels
            console.log('Values======>', curr.currValues)
            console.log('Labels======>', curr.currLabels)
          }
        }
      )
    }
  },
  watch: {
    currValues (val) {
      this.$emit('input', val.join(','))
    },
    currLabels (val) {
      this.$emit('on-labelChange', val)
    },
    value (val) {
      console.info('监控属性发现this.value变化,重置' + val)
      this.init()
    }
  }
}

</script>

<style lang="less" scoped>
@import url('../assets/css/global.less');
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
}
</style>
