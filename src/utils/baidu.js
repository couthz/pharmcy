const BaiDu = {
  /* eslint-disable no-undef */
  location () {
    return new Promise((resolve, reject) => {
      /** BaiDuMap */
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function (r) {
        this.showloading = false
        var cityName = ''
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          var geoc = new BMap.Geocoder()
          geoc.getLocation(r.point, function (rs) {
            var addObj = rs.addressComponents
            cityName = addObj.city
            console.log('定位成功,当前定位城市:' + cityName)
            resolve(cityName)
          })
        } else {
          resolve('')
        }
      })
    })
  }
}

export default BaiDu
