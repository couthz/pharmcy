<template>
<div>
  <div class='weui-content'>
    <div class="user">
      <div>
        <img :src="userInfo.headImg" class="headerimg" />
      </div>
      <div class="info">
        <div class="phoneno">{{showUserName}}</div>
        <div class="member">
          <div class="icon"></div>
          <div class="title">普通会员</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="cardinfo">
        <div class="no">{{haiDianUserInfo.memcardno}}</div>
        <div class="title">会员卡号</div>
      </div>
      <div>
        <div class="amount">
          <div class="num">{{haiDianUserInfo.realamount}}</div>
          <div class="title">消费金额(元)</div>
        </div>
        <div class="integral">
          <div class="num">{{haiDianUserInfo.integral}}</div>
          <div class="title">当前积分</div>
        </div>
      </div>
    </div>
    <div class="weui-panel">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells">
            <!-- <a class="weui-cell weui-cell_access" href="userInfo.html">
              <div class="weui-cell__hd"><img src="../../assets/images/center-icon-jyjl.png" alt="" class="center-list-icon"></div>
              <div class="weui-cell__bd weui-cell_primary">
                <p class="center-list-txt">基本信息</p>
              </div>
              <span class="weui-cell__ft"></span>
            </a> -->
            <!-- <a class="weui-cell weui-cell_access" href="/wxshop/addressList.html">
              <div class="weui-cell__hd"><img src="../../assets/images/center-icon-dz.png" alt="" class="center-list-icon"></div>
              <div class="weui-cell__bd weui-cell_primary">
                <p class="center-list-txt">地址管理</p>
              </div>
              <span class="weui-cell__ft"></span>
            </a> -->
            <!-- <a class="weui-cell weui-cell_access" href="">
              <div class="weui-cell__hd"><img src="../../assets/images/center-icon-yhk.png" alt="" class="center-list-icon"></div>
              <div class="weui-cell__bd weui-cell_primary">
                <p class="center-list-txt">客服电话</p>
              </div>
              <span class="weui-cell__ft"></span>
            </a> -->
            <router-link :to="{name: 'mine_consumptiondetail'}" class="weui-cell weui-cell_access">
              <div class="weui-cell__hd"><img src="../../assets/images/icon_consumptiondetail.png" class="center-list-icon"></div>
              <div class="weui-cell__bd weui-cell_primary">
                <p class="center-list-txt">消费明细</p>
              </div>
              <span class="weui-cell__ft"></span>
            </router-link>
            <router-link :to="{name: 'mine_integraldetail'}" class="weui-cell weui-cell_access">
              <div class="weui-cell__hd"><img src="../../assets/images/icon_integraldetail.png" class="center-list-icon"></div>
              <div class="weui-cell__bd weui-cell_primary">
                <p class="center-list-txt">积分明细</p>
              </div>
              <span class="weui-cell__ft"></span>
            </router-link>
            <router-link :to="{name: 'mine_membercard'}" class="weui-cell weui-cell_access">
              <div class="weui-cell__hd"><img src="../../assets/images/icon_membercard.png" class="center-list-icon"></div>
              <div class="weui-cell__bd weui-cell_primary">
                <p class="center-list-txt">会员卡</p>
              </div>
              <span class="weui-cell__ft"></span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { getUserInfoAndHaiDian } from '@/api/user'
import loading from '@/utils/loading'
import Common from '@/utils/common'

export default {
  name: 'mine_index',
  data () {
    return {
      userInfo: {},
      haiDianUserInfo: {}
    }
  },
  computed: {
    showUserName () {
      if (Common.strIsEmpty(this.userInfo.username)) {
        return this.userInfo.nickname
      }
      return this.userInfo.username
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      loading.show()
      getUserInfoAndHaiDian().then(res => {
        this.userInfo = res.userInfo
        if (res.haidianUserInfo === null) {
          this.haiDianUserInfo = {}
        } else {
          this.haiDianUserInfo = res.haidianUserInfo
        }
        loading.hide()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.rem(@name,@px) {
    @{name}: unit(@px / 75, rem);
 }
.user{
  .rem(height,120);
  .rem(padding-top,40);
  .rem(padding-left,43);

  .headerimg{
    .rem(width,120);
    .rem(height,120);
    border-radius:50%;
    float: left;
  }

  .info{
    float: left;
    .rem(padding-left,40);
    .phoneno{
      .rem(width,185);
      .rem(font-size,30);
      .rem(padding-bottom,5);
      .rem(padding-top,10);
      font-family:MicrosoftYaHei-Bold;
      font-weight:bold;
      color:rgba(34,34,34,1);
    }

    .member{
      .rem(height,45);
      .rem(border-radius,20);
      background:rgba(252,206,9,1);

      .icon{
        .rem(margin-left,15);
        .rem(margin-top,6);
        .rem(width,36);
        .rem(height,30);
        float: left;
        background: url('../../assets/images/membericon.png');
        background-size: cover;
      }

      .title{
        .rem(font-size,26);
        .rem(padding-left,10);
        .rem(padding-right,10);
        .rem(margin-top,6);
        height: 100%;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(255,254,254,1);
        float: left;
        vertical-align: middle;

      }
    }
  }
}
.card{
  .rem(width,672);
  .rem(height,308);
  .rem(border-radius,20);
  .rem(margin-top,30);
  .rem(margin-bottom,30);
  background-image: url('../../assets/images/uccardbg.png');
  font-family:MicrosoftYaHei-Bold;
  color:rgba(255,254,254,1);
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background-size: cover;

  .cardinfo{
    .rem(padding-top,80);

    .no{
      width:100%;
      .rem(font-size,30);
      font-weight:bold;
      text-align: center;
    }

    .title{
      width:100%;
      .rem(font-size,26);
      font-weight:400;
      text-align: center;
    }
  }

  .amount{
    width: 50%;
    float: left;
    text-align: center;
    vertical-align: middle;
    .rem(padding-top,30);
    .rem(font-size,26);

    .num{
      width: 100%;
      font-weight:400;
    }

    .title{
      width: 100%;
      font-weight:400;
    }
  }

  .integral{
    width: 50%;
    float: left;
    text-align: center;
    vertical-align: middle;
    .rem(padding-top,30);
    .rem(font-size,26);

    .num{
      width: 100%;
      font-weight:400;
    }

    .title{
      width: 100%;
      font-weight:400;
    }
  }

}
</style>
