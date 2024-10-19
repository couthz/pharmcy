<template>
  <div>
    <div class="remind-picker-item form-item" @click="picker(index-1)" v-for="index in num" :key="index">{{currLabels[index-1]}}</div>
  </div>
</template>

<script>
import weui from 'weui.js'
import PickerData from '@/data/pickerdata'
import Common from '@/utils/common'

export default {
  name: 'TimePickerInput',
  data () {
    return {
      currValues: [],
      currLabels: [],
      pickerData1: PickerData.WeekData,
      pickerData2: PickerData.HourData,
      pickerData3: PickerData.MinutesData
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 1
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var array = []
      if (!Common.strIsEmpty(this.value)) {
        array = this.value.split('-')
      }

      this.currValues = []
      this.currLabels = []

      for (var i = 1; i <= this.num; i++) {
        if (array.length < i) {
          this.currValues.push('2,9,0')
        } else {
          this.currValues.push(array[i - 1])
        }
      }

      this.currValues.forEach(c => {
        var array = c.split(',')
        var label = ''
        this.pickerData1.forEach(element => {
          if (element.value === array[0]) {
            label += element.label + ' '
          }
        })
        this.pickerData2.forEach(element => {
          if (element.value === array[1]) {
            label += element.label
          }
        })
        this.pickerData3.forEach(element => {
          if (element.value === array[2]) {
            label += element.label
          }
        })
        this.currLabels.push(label)
      })
    },
    picker (index) {
      let curr = this
      let defaultVal = []
      this.currValues[index].split(',').forEach(e => {
        defaultVal.push(e)
      })
      weui.picker(
        this.pickerData1,
        this.pickerData2,
        this.pickerData3,
        {
          id: 'week_picker_' + index,
          defaultValue: defaultVal,
          onConfirm (result) {
            curr.currValues.splice(index, 1, result[0].value + ',' + result[1].value + ',' + result[2].value)
            curr.currLabels.splice(index, 1, result[0].label + ' ' + result[1].label + result[2].label)
          }
        }
      )
    }
  },
  watch: {
    currValues (val) {
      this.$emit('input', val.join('-'))
    },
    currLabels (val) {
      this.$emit('on-labelChange', val.join('-'))
    },
    value (val) {
      this.init()
    },
    num (val) {
      this.init()
    }
  }
}

</script>

<style lang="less" scoped>
@import url('../assets/css/global.less');
.form-item{
  margin-bottom: 10px;
}
</style>
