<template>
  <div class="share-wrapper">
    <div class="remind-page-bg"></div>
    <div class="share-img"><img src="../../assets/images/remind_share.png" /></div>
    <div class="share-text"><img src="../../assets/images/share-text.png" /></div>
    <div class="share-message">
      <p>您好:{{shareInfo.nickName}}</p>
      <p>您的好友 {{shareInfo.shareName}} 给您制定了一份</p>
      <p class="color">[{{shareInfo.remindType}}] 提醒计划</p>
      <p>点击按钮接受此次分享</p>
      <p>祝您身体健康！</p>
      <div class="remind-from-btn btn" @click="acceptShare">接受</div>
    </div>
  </div>
</template>

<script>
import { getShareInfo, acceptShare } from '@/api/remind'
import loading from '@/utils/loading'

export default {
  name: 'remind_share',
  data () {
    return {
      shareInfo: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      loading.show()
      let id = this.$route.params.id
      getShareInfo(id).then(res => {
        this.shareInfo = res
        loading.hide()
      })
    },
    acceptShare () {
      let id = this.$route.params.id
      loading.show()
      acceptShare(id).then(res => {
        loading.hide()
        let code = res.code
        if (code !== 0) {
          this.$weui.alert(res.message)
          return
        }
        this.$router.push({ name: 'remind_list' })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/global.less';
.share-wrapper{
  width: 100%;
  .share-img{
    .rem(margin-top,50);
    img{
      .rem(width,146);
      .rem(height,160);
      margin: auto;
      display: block;
    }
  }
  .share-text{
    .rem(margin-top,50);
    .rem(margin-bottom,50);
    img{
      .rem(width,331);
      .rem(height,117);
      margin: auto;
      display: block;
    }
  }
  .share-message{
    background:#FFFFFF;
    box-shadow:0px 14px 4px 0px rgba(0,46,89,0.2);
    border-radius:10px;
    .rem(padding,80);
    box-sizing: border-box;
    .rem(margin-left,30);
    .rem(margin-right,30);
    .rem(margin-bottom,30);
    p{
      display: block;
      text-align: center;
      .rem(height,60);
      .rem(line-height,60);
      .rem(font-size,35);
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(41,193,197,1);
    }
    .color{
      color:#0670B7;
    }
    .btn{
      width: 100%;
      .rem(margin-top,160);
      font-family:MicrosoftYaHeiLight;
      font-weight:300;
      color:rgba(255,255,255,1);
      .rem(font-size,30);
    }
  }
}
</style>
