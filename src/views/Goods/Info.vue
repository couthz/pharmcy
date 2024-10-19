<template>
<div>
  <!--主体-->
  <div class="weui-content">
      <!--产品详情-->
      <div class="weui-tab">
          <div class="weui-tab__bd proinfo-tab-con">
              <input type="hidden" :value="goodsModel.goodsId">
              <div class="weui-tab__bd-item weui-tab__bd-item--active">
                  <!--主图轮播-->
                  <swiper :options="swiperOption" class="swiper-zhutu">
                    <swiper-slide>
                        <img :src="goodsModel.goodsImg" />
                    </swiper-slide>
                    <div class="swiper-pagination"></div>
                  </swiper>
                  <div class="wy-media-box-nomg weui-media-box_text">
                      <h4 class="wy-media-box__title">{{goodsModel.goodsName}}</h4>
                      <div class="wy-pro-pri mg-tb-5">¥<em class="num font-20">{{goodsModel.goodsPrice}}</em></div>
                      <p class="weui-media-box__desc">{{goodsModel.goodsSpe}}</p>
                  </div>
                  <div class="wy-media-box2 txtpd weui-media-box_text" v-html="goodsModel.goodsDetail"></div>
              </div>
          </div>
      </div>
  </div>
  <!--底部导航-->
  <div class="foot-black"></div>
  <div class="weui-tabbar wy-foot-menu">
      <a href="javascript:void(0);" @click="onLineService" class="weui-tabbar__item yellow-color open-popup" data-target="#join_cart">
          <p class="promotion-foot-menu-label">在线咨询药师</p>
      </a>
      <a :href="'tel:' + headquarterModel.headqrterKftel" class="weui-tabbar__item red-color open-popup" data-target="#selcet_sku">
          <p class="promotion-foot-menu-label">电话咨询药师</p>
      </a>
  </div>
</div>
</template>

<script>
import { getGoodsInfo } from '@/api/goods'
import { getHeadquarters, getWxSetting } from '@/api/system'
import loading from '@/utils/loading'
import axios from 'axios'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import WeChat from '../../utils/wechat'

export default {
  name: 'goods_info',
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        }
      },
      goodsId: '',
      goodsModel: {},
      headquarterModel: {},
      wxSettingModel: {}
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      loading.show()
      const self = this
      this.goodsId = this.$route.params.id
      Promise.all(
        [
          getGoodsInfo(this.goodsId),
          getHeadquarters(),
          getWxSetting()
        ]
      ).then(axios.spread(function (goodsResp, headquartersResp, wxSettingResp) {
        self.goodsModel = goodsResp.info
        self.headquarterModel = headquartersResp.info
        self.wxSettingModel = wxSettingResp.info
        let title = self.goodsModel.goodsName
        let url = location.href
        let picUrl = self.wxSettingModel.link + self.goodsModel.goodsImg
        WeChat.share(title, url, url, picUrl)
        loading.hide()
      }))
    },
    onLineService () {
      var baseUrl = this.wxSettingModel.link
      var title = this.goodsModel.goodsName
      var url = baseUrl + this.$router.resolve({ name: 'goods_info', params: { id: this.goodsModel.goodsId } }).href
      var abstract = this.goodsModel.goodsName + this.goodsModel.goodsSpe
      var thumbnail = baseUrl + this.goodsModel.goodsImg
      var label = this.goodsModel.goodsPrice
      var serviceUrl = this.headquarterModel.headqrterHkflink + '&title_info=' + encodeURIComponent(title) +
        '&url_info=' + encodeURIComponent(url) +
        '&abstract_info=' + encodeURIComponent(abstract) +
        '&label_info=￥' + encodeURIComponent(label) + '元' +
        '&thumbnail_info=' + encodeURIComponent(thumbnail) +
        '&r=' + Math.random()
      window.location.href = serviceUrl
    }
  }
}
</script>
