<template>
<div>
  <div class="position-box">
    <div class="detail-content nodate" v-if="count === 0">暂无积分明细记录</div>
    <vue-better-scroll ref="scroll"
                      :scrollbar="scrollbarObj"
                      :pullDownRefresh="pullDownRefreshObj"
                      :pullUpLoad="pullUpLoadObj"
                      :startY="parseInt(startY)"
                      @pullingDown="onPullingDown"
                      @pullingUp="onPullingUp"
                      v-if="details.length > 0">
      <div class="detail-content">
        <div class="items clearfix" v-for="(detail, index) in details" :key="index">
          <div class="info">
            <p class="title">
              {{detail.billcode}}
            </p>
            <p class="date">
              {{detail.accdate}}
            </p>
          </div>
          <div class="integral">
              {{detail.integral}} 积分
          </div>
        </div>
      </div>
    </vue-better-scroll>
  </div>
</div>

</template>

<script>
import { getIntegralDetails } from '@/api/user'
import loading from '@/utils/loading'
import VueBetterScroll from 'vue2-better-scroll'

export default {
  name: 'mine_integraldetail',
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
      details: [],
      count: null
    }
  },
  components: {
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
      getIntegralDetails(this.pageIndex, this.pageSize).then(res => {
        self.details = res.haiDianIntegralDetails.records
        self.count = self.details.length
        loading.hide()
      })
    },
    onPullingDown () {
      let self = this
      self.pageIndex = 1
      getIntegralDetails(self.pageIndex, self.pageSize).then(res => {
        self.details = res.haiDianIntegralDetails.records
        self.count = self.details.length
        this.$refs.scroll.forceUpdate(true)
      })
    },
    onPullingUp () {
      let self = this
      self.pageIndex++
      getIntegralDetails(self.pageIndex, self.pageSize).then(res => {
        let pageCount = res.haiDianIntegralDetails.pages
        let isShow = true
        if (self.pageIndex >= pageCount) {
          isShow = false
          self.pageIndex--
        }
        this.$refs.scroll.forceUpdate(isShow)
        self.details = self.details.concat(...res.haiDianIntegralDetails.records)
        self.count = self.details.length
        this.$refs.scroll.refresh()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.rem(@name,@px) {
    @{name}: unit(@px / 75, rem);
 }
.detail-content{
  font-family:MicrosoftYaHeiLight;
  color:rgba(62,74,89,1);
  .items{
    background-color: #FFFFFF;
    border-bottom: solid rgba(221,221,221,1);
    .rem(border-bottom-width,2);
    .rem(padding-top,20);
    .rem(padding-right,20);
    .rem(padding-bottom,20);
    .rem(padding-left,20);
    zoom: 1;
    &:after{
      display: block;
      visibility: hidden;
      clear: both;
      height: 0;
      content: "."
    }
    .info{
      float: left;
      .rem(padding-right,80);
      .title{
        .rem(font-size,26);
        .rem(height,50);
        font-weight:300;
        vertical-align: middle;
      }
      .date{
        .rem(font-size,22);
        font-weight:300;
      }
    }
    .integral{
      .rem(font-size,26);
      .rem(height,50);
      .rem(padding-right,50);
      float:right;
      font-weight:300;
      vertical-align: middle;
    }
  }
}
.position-box {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0px;
  overflow: hidden;
  z-index: 1;
  background:#F2F2F2;
}
.pulldown-wrapper, .pullup-wrapper{
  font-size: 13px;
}
.nodate{
  width: 100%;
  .rem(padding-top,10);
  text-align: center;
}
</style>
