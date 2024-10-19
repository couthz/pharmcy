const PickerData = {
  remindtypePickerData: [
    {
      label: '血压监测',
      value: '2'
    },
    {
      label: '血糖监测',
      value: '3'
    },
    {
      label: '体重监测',
      value: '4'
    }
  ],
  HourData: [
    {
      label: '0时',
      value: '0'
    },
    {
      label: '1时',
      value: '1'
    },
    {
      label: '2时',
      value: '2'
    },
    {
      label: '3时',
      value: '3'
    },
    {
      label: '4时',
      value: '4'
    },
    {
      label: '5时',
      value: '5'
    },
    {
      label: '6时',
      value: '6'
    },
    {
      label: '7时',
      value: '7'
    },
    {
      label: '8时',
      value: '8'
    },
    {
      label: '9时',
      value: '9'
    },
    {
      label: '10时',
      value: '10'
    },
    {
      label: '11时',
      value: '11'
    },
    {
      label: '12时',
      value: '12'
    },
    {
      label: '13时',
      value: '13'
    },
    {
      label: '14时',
      value: '14'
    },
    {
      label: '15时',
      value: '15'
    },
    {
      label: '16时',
      value: '16'
    },
    {
      label: '17时',
      value: '17'
    },
    {
      label: '18时',
      value: '18'
    },
    {
      label: '19时',
      value: '19'
    },
    {
      label: '20时',
      value: '20'
    },
    {
      label: '21时',
      value: '21'
    },
    {
      label: '22时',
      value: '22'
    },
    {
      label: '23时',
      value: '23'
    }
  ],
  MinutesData: [
    {
      label: '00分',
      value: '0'
    },
    {
      label: '10分',
      value: '10'
    },
    {
      label: '20分',
      value: '20'
    },
    {
      label: '30分',
      value: '30'
    },
    {
      label: '40分',
      value: '40'
    },
    {
      label: '50分',
      value: '50'
    }
  ],
  WeekData: [
    {
      label: '周一',
      value: '2'
    },
    {
      label: '周二',
      value: '3'
    },
    {
      label: '周三',
      value: '4'
    },
    {
      label: '周四',
      value: '5'
    },
    {
      label: '周五',
      value: '6'
    },
    {
      label: '周六',
      value: '7'
    },
    {
      label: '周日',
      value: '1'
    }
  ],
  /**
   * 规格
   */
  dosagePickerData () {
    var data = []
    for (var i = 0.5; i <= 3; i += 0.5) {
      data.push({
        label: i.toString(),
        value: i.toString()
      })
    }
    return data
  },
  /**
   * 规格单位
   */
  dosageunitPickerData () {
    var array = ['粒', '片', '袋', '包', '只', '瓶']
    var data = []
    for (var i = 0; i < array.length; i++) {
      data.push({
        label: array[i],
        value: array[i]
      })
    }
    return data
  },
  /**
   * 提醒类型
   */
  remindnumtypePickerData: [
    {
      label: '每天',
      value: '1'
    },
    {
      label: '每周',
      value: '2'
    }
  ],
  /**
   * 提醒次数
   */
  remindnumPickerData () {
    var data = []
    for (var i = 1; i < 9; i++) {
      data.push({
        label: i,
        value: i
      })
    }
    return data
  },
  /**
   * 提醒天数
   */
  reminddaysPickerData () {
    var data = []
    for (var i = 1; i <= 30; i++) {
      data.push({
        label: i,
        value: i
      })
    }
    return data
  }
}

export default PickerData
