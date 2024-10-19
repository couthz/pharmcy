<template>
  <div class="remind-picker-item" @click="picker">{{currLabel}}</div>
</template>

<script>
import weui from 'weui.js'
import Common from '@/utils/common'

export default {
  name: 'PickerInput',
  data () {
    return {
      currValue: this.value,
      currLabel: '请选择'
    }
  },
  props: {
    value: {
      type: [String, Number]
    },
    pickerData: {
      type: Array,
      required: true
    },
    labelPrefix: {
      type: String,
      default: ''
    },
    labelSuffix: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (Common.strIsEmpty(this.value)) {
        this.currLabel = this.labelPrefix + this.pickerData[0].label + this.labelSuffix
        this.currValue = this.pickerData[0].value
        return
      }
      this.pickerData.forEach(element => {
        if (element.value === this.currValue) {
          this.currLabel = this.labelPrefix + element.label + this.labelSuffix
        }
      })
    },
    picker () {
      let curr = this
      var defaultVal = []
      defaultVal.push(this.currValue)
      weui.picker(
        this.pickerData,
        {
          id: Math.random(),
          defaultValue: defaultVal,
          onConfirm (result) {
            curr.currValue = result[0].value
            curr.currLabel = curr.labelPrefix + result[0].label + curr.labelSuffix
          }
        }
      )
    }
  },
  watch: {
    currValue (val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    value (val) {
      this.currValue = val
      this.init()
    },
    currLabel (val) {
      this.$emit('on-labelChange', val)
    }
  }
}

</script>

<style lang="less" scoped>
@import url('../assets/css/global.less');
</style>
