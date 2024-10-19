const Common = {
  strIsEmpty (str) {
    if (typeof str === 'undefined' || str === 'null' || str == null || str === '') {
      return true
    }
    return false
  },
  strStartWith (str, startStr) {
    var index = str.indexOf(startStr)
    if (index === 0) {
      return true
    }
    return false
  },
  isNumber (str) {
    var re = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*$/
    if (re.test(str)) {
      return false
    }
    return true
  }
}

export default Common
