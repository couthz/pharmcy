<template>
<div>
  <!--顶部搜索-->
  <header class='weui-header fixed-top'>
     <search message="输入药品名称" />
  </header>
  <!--主体-->
  <div class='weui-content' style="padding-top: 35px;">
    <!--顶部轮播-->
    <swiper v-if="banners.length>0" :options="swiperOption" class="swiper-banner">
      <swiper-slide v-for="banner in banners" :key="banner.banId">
          <img :src="banner.banImg" />
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <!--图标分类1行只能是4个-->
    
    <div class="weui-flex wy-iconlist-box">
      <div class="weui-flex__item"><a :href="headquartersModel.headqrterHkflink" id="onlineConsult" class="wy-links-iconlist"><div class="img"><img src="../../assets/images/yaoshizixun140.jpg"></div><p>咨询药师</p></a></div>
      <div class="weui-flex__item"><a :href="'tel:'+headquartersModel.headqrterKftel" id="phoneConsult" class="wy-links-iconlist"><div class="img"><img src="../../assets/images/phone-zixun.jpg"></div><p>电话咨询</p></a></div>
      <div class="weui-flex__item"><a href="/home/category" id="recommends" class="wy-links-iconlist"><div class="img"><img src="../../assets/images/icon-link1.jpg"></div><p>精品推荐</p></a></div>
      <div class="weui-flex__item"><a :href="headquartersModel.headqrterDrugssubmit" id="drugssubmit" class="wy-links-iconlist"><div class="img"><img src="../../assets/images/icon-link4.jpg"></div><p>用药登记</p></a></div>
    </div>
    <!--根据区域动态显示用户定义的图标分类菜单,目前只允许用户添加4个-->    
    <!--新闻切换-->
    <div class="wy-ind-news">
      <i class="news-icon-laba"></i>
      <swiper :options="swiperOptionNews" class="swiper-banner">
        <swiper-slide>
            <p>热烈祝贺在线药房正式上线</p>
        </swiper-slide>
        <swiper-slide>
            <p>公司开展高科技医疗服务</p>
        </swiper-slide>
      </swiper>
      <a class="newsmore"><i class="news-icon-more"></i></a>
    </div>
    <!--广告轮播-->
    <swiper v-if="ads.length>0" :options="swiperOption" class="swiper-adv">
      <swiper-slide v-for="(ad , index) in ads" :key="index">
          <img :src="ad.banImg" />
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <ComGoodsList title="精品推荐" :goodsList="recommends" cid="all"/>
    <ComRecommendCategory v-for="(model, index) in categorysList" :key="index" :title="model.ctgName" :cid="model.ctgId" />
  </div>
</div>
</template>

<script>
import Search from '@/components/Search.vue'
import { getBanners, getHomeMenus, getRecommends } from '@/api/index'
import { getRecommendCategorys } from '@/api/goods'
import { getHeadquarters, getWxSetting } from '../../api/system'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import ComGoodsList from './components/GoodsList'
import ComRecommendCategory from './components/RecommendCategory'
import axios from 'axios'
import loading from '@/utils/loading'
import WeChat from '../../utils/wechat'

export default {
  name: 'home_index',
  data () {
    return {
      swiperOption: {
        loop: true,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true
      },
      swiperOptionNews: {
        loop: true,
        autoplay: true,
        direction: 'vertical'
      },
      banners: [],
      homemenus: [],
      homemenus_empty: 0,
      ads: [],
      recommends: [],
      headquartersModel: {},
      categorysList: []
    }
  },
  components: {
    Search,
    swiper,
    swiperSlide,
    ComGoodsList,
    ComRecommendCategory
  },
  mounted () {
    this.getViewData()
  },
  methods: {
    getViewData () {
      const self = this
      loading.show()
      Promise.all(
        [
          getBanners(1),
          getHomeMenus(),
          getBanners(2),
          getRecommends(),
          getHeadquarters(),
          getRecommendCategorys(),
          getWxSetting()
        ]
      ).then(axios.spread(function (bannersResp, homemenuResp, adsRest, recommendsResp, headquartersResp, categorysResp, wxSettingResp) {
        self.banners = bannersResp.list
        self.homemenus = homemenuResp.list
        self.homemenus_empty = 4 - self.homemenus.length
        self.ads = adsRest.list
        self.recommends = recommendsResp.list
        self.headquartersModel = headquartersResp.info
        self.categorysList = categorysResp.list
        let title = '在线药房'
        let url = location.href
        let picUrl = wxSettingResp.info.link + '/img/share_index.png'
        WeChat.share(title, url, url, picUrl)
        loading.hide()
      }))
    }
  }
}
</script>

<style scoped>
</style>
