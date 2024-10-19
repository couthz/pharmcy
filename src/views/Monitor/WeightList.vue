<template>
  <div>
    <div class="position-box">
    <div class="detail-content nodate" v-if="count === 0">暂无体重记录</div>
    <vue-better-scroll ref="scroll"
                      :scrollbar="scrollbarObj"
                      :pullDownRefresh="pullDownRefreshObj"
                      :pullUpLoad="pullUpLoadObj"
                      :startY="parseInt(startY)"
                      @pullingDown="onPullingDown"
                      @pullingUp="onPullingUp"
                      v-if="details.length > 0">
      <div class="detail-content">
        <div class="items" v-for="(detail, index) in details" :key="index">
          <div class="info clearfix">
            <p class="weight">
              体重：{{detail.weight}}kg
            </p>
          </div>
          <div class="measureTime">{{detail.measureTime}}
          </div>
        </div>
      </div>
    </vue-better-scroll>
    </div>
  </div>
</template>

<script>
import { getUserWeight } from '@/api/monitor'
import loading from '@/utils/loading'
import VueBetterScroll from 'vue2-better-scroll'

export default {
  name: 'monitor_weightlist',
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
      getUserWeight(this.pageIndex, this.pageSize).then(res => {
        self.details = res.userWeight.records
        self.count = self.details.length
        loading.hide()
      })
    },
    onPullingDown () {
      let self = this
      self.pageIndex = 1
      getUserWeight(self.pageIndex, self.pageSize).then(res => {
        self.details = res.userWeight.records
        self.count = self.details.length
        this.$refs.scroll.forceUpdate(true)
      })
    },
    onPullingUp () {
      let self = this
      self.pageIndex++
      getUserWeight(self.pageIndex, self.pageSize).then(res => {
        let pageCount = res.userWeight.pages
        let isShow = true
        if (self.pageIndex >= pageCount) {
          isShow = false
          self.pageIndex--
        }
        this.$refs.scroll.forceUpdate(isShow)
        self.details = self.details.concat(...res.userWeight.records)
        self.count = self.details.length
        this.$refs.scroll.refresh()
      })
    }
  },
  filters: {
    parseStatus () {

    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/global.less';
.detail-content{
  font-family:MicrosoftYaHeiLight;
  color:rgba(62,74,89,1);
  .items{
    background-color: #FFFFFF;
    border-bottom: solid rgba(221,221,221,1);
    .rem(border-bottom-width,2);
    .rem(padding-top,20);
    .rem(padding-right,20);
    .rem(padding-bottom,18);
    .rem(padding-left,20);
    zoom: 1;
    .info{
      .rem(height,40);
      .rem(padding-right,80);
      .weight{
        float: left;
        margin-left: 10px;
        .rem(line-height,40);
        .rem(font-size,22);
        font-weight:300;
      }
    }
    .measureTime{
      .rem(padding-top,10);
      .rem(padding-left,20);
      .rem(font-size,22);
      font-weight:300;
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
  background:#6A9DD3;
}
.pulldown-wrapper, .pullup-wrapper{
  font-size: 13px;
}
</style>
