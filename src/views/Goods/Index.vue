<template>
<div>
  <!--顶部搜索-->
  <header class='weui-header fixed-top'>
    <search message="输入药品名称" />
    <div class="pro-sort">
      <div class="weui-flex">
        <div class="weui-flex__item"><div class="placeholder NormalCss">综合</div></div>
        <!-- <div class="weui-flex__item"><div class="placeholder SortAscCss">按销量</div></div>
        <div class="weui-flex__item"><div class="placeholder SortDescCss">按价格</div></div> -->
      </div>
    </div>
  </header>
  <div class="position-box weui-content">
    <vue-better-scroll ref="scroll"
                      :scrollbar="scrollbarObj"
                      :pullDownRefresh="pullDownRefreshObj"
                      :pullUpLoad="pullUpLoadObj"
                      :startY="parseInt(startY)"
                      @pullingDown="onPullingDown"
                      @pullingUp="onPullingUp"
                      v-if="goodsList.length > 0">
      <div class='demos-content-padded proListWrap'>
        <div class="pro-items" v-for="(goodsModel, index) in goodsList" :key="index">
          <router-link :to="{name: 'goods_info', params:{id: goodsModel.goodsId}}" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" v-lazy="goodsModel.goodsImg" :alt="goodsModel.goodsName">
            </div>
            <div class="weui-media-box__bd">
              <h1 class="weui-media-box__desc">{{goodsModel.goodsName}}</h1>
              <h1 class="weui-media-box__desc">{{goodsModel.goodsSpe}}</h1>
              <div class="wy-pro-pri">¥<em class="num font-15">{{goodsModel.goodsPrice}}/{{goodsModel.goodsUnit}}</em></div>
              <ul class="weui-media-box__info prolist-ul">
                <li class="weui-media-box__info__meta">咨询电话： <em class="num">
                    <object>
                      <a :href="'tel:' + phoneNumber" style="color:#585858;text-decoration:underline;">{{phoneNumber}}</a>
                    </object>
                  </em>
                </li>
              </ul>
            </div>
          </router-link>
        </div>
      </div>
    </vue-better-scroll>
  </div>
</div>
</template>

<script>
import Search from '@/components/Search.vue'
import { getPageGoods } from '@/api/goods'
import { getHeadquarters } from '@/api/system'
import loading from '@/utils/loading'
import axios from 'axios'
import VueBetterScroll from 'vue2-better-scroll'

export default {
  name: 'goods_list',
  data () {
    return {
      scrollbarObj: {
        fade: true
      },
      pullDownRefreshObj: {
        threshold: 90,
        stop: 40
      },
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: '加载更多',
          noMore: '没有更多数据了'
        }
      },
      startY: 0,
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      currCid: '',
      phoneNumber: '',
      goodsList: []
    }
  },
  components: {
    Search,
    VueBetterScroll
  },
  created () {
    this.pageIndex = 1
    this.pageSize = 10
    this.init()
  },
  methods: {
    init () {
      loading.show()
      let self = this
      const cId = this.$route.params.id
      if (cId === 'all') {
        this.currCid = ''
      } else {
        this.currCid = cId
      }
      Promise.all(
        [
          getPageGoods(self.currCid, self.pageIndex, self.pageSize),
          getHeadquarters()
        ]
      ).then(axios.spread(function (goodsResp, headquartersResp) {
        self.goodsList = goodsResp.page.records
        self.phoneNumber = headquartersResp.info.headqrterKftel
        loading.hide()
      }))
    },
    onPullingDown () {
      let self = this
      self.pageIndex = 1
      getPageGoods(self.currCid, self.pageIndex, self.pageSize).then(res => {
        self.goodsList = res.page.records
        this.$refs.scroll.forceUpdate(true)
      })
    },
    onPullingUp () {
      let self = this
      self.pageIndex++
      getPageGoods(self.currCid, self.pageIndex, self.pageSize).then(res => {
        let pageCount = res.page.pages
        let isShow = true
        if (self.pageIndex >= pageCount) {
          isShow = false
          self.pageIndex--
        }
        this.$refs.scroll.forceUpdate(isShow)
        self.goodsList = self.goodsList.concat(...res.page.records)
        this.$refs.scroll.refresh()
      })
    }
  }
}
</script>

<style>
.position-box {
  width: 100%;
  position: fixed;
  top: 85px;
  left: 0;
  right: 0;
  bottom: 0px;
  overflow: hidden;
  z-index: 1;
}
.pulldown-wrapper, .pullup-wrapper{
  font-size: 13px;
}
</style>
