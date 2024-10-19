<template>
  <div class="wrapper">
    <div class="remind-page-bg"></div>
    <div class="userinfo-wrapper clearfloat" v-if="userInfo !== null">
      <img :src="userInfo.headImg" class="head-img" />
      <div class="info">
        <span class="name">{{userInfo.nickname}}</span>
        <span class="username">{{userInfo.username}}</span>
      </div>
    </div>
    <div class="list-wrapper__nodata" v-show="count === 0">
      <img src="../../assets/images/nodata.png" />
      <span>您还没有设置提醒计划哦</span>
    </div>
    <div class="list-wrapper" v-show="count > 0">
      <ul>
        <li v-for="(remind, index) in remindInfoList" :key="index" @click="remindClick(remind.remindtype,remind.id,remind.shareuserid)">
          <div class="remind-info">
            <div class="switch">
              <input class="weui-switch" @change="swichChange(remind.status,remind.id)" @click.stop v-model="remind.status" type="checkbox">
            </div>
            <div class="title">{{remind.remindTypeLabel}}{{remind.drugname}}{{remind.spec}}</div>
            <div class="spec">
              <span v-show="remind.remindtype === '1'">每次{{remind.dosage}}{{remind.dosageunit}} / </span>
              {{remind.remindnumtypeLabel}}{{remind.remindnum}}次 /
              <span v-show="remind.remindtype !== '1'">持续{{remind.reminddays}}{{remind.remindnumtype | formatRemingNumTypeUnit}} / </span>
              {{remind.endtime | formatEndTime(remind.starttime)}}
            </div>
            <div class="time clearfloat">
              <span v-for="item in remind.timedetailslabel.split('-')" :key="item">{{item}}</span>
            </div>
            <div class="share clearfloat" v-if="remind.shardUserName !== null">
              <img src="../../assets/images/icon-share.png" />
              <span>{{remind.shardUserName}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div @click="jumpToAdd" class="remind-from-btn btn-wrapper">+</div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { getRemindList, changeInfoStatus } from '@/api/remind'
import axios from 'axios'
import loading from '@/utils/loading'
import Common from '../../utils/common'

export default {
  name: 'remind_list',
  data () {
    return {
      userInfo: {},
      count: null,
      remindInfoList: [],
      loop: null
    }
  },
  components: {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      loading.show()
      let self = this
      Promise.all(
        [
          getUserInfo(),
          getRemindList()
        ]
      ).then(axios.spread(function (userInfoResp, remindInfoRes) {
        self.userInfo = userInfoResp.info
        self.remindInfoList = remindInfoRes.list
        self.count = self.remindInfoList.length
        loading.hide()
      }))
    },
    jumpToAdd () {
      let self = this
      this.$weui.actionSheet([
        {
          label: '用药提醒',
          onClick: function () {
            self.$router.push({ name: 'remind_add_1' })
          }
        },
        {
          label: '监测提醒',
          onClick: function () {
            self.$router.push({ name: 'remind_add_2' })
          }
        }
      ])
    },
    swichChange (status, id) {
      loading.show()
      changeInfoStatus(status, id).then(res => {
        loading.hide()
        let code = res.code
        if (code !== 0) {
          this.$weui.alert(res.message)
        }
      })
    },
    remindClick (type, id, shareUserId) {
      if (!Common.strIsEmpty(shareUserId)) {
        this.$weui.alert('别人分享的提醒不能修改')
        return
      }
      let name = 'remind_update_1'
      if (type !== '1') {
        name = 'remind_update_2'
      }
      this.$router.push({ name: name, params: { id: id } })
    }
  },
  filters: {
    formatEndTime (val, startTime) {
      var dateSpan, iDays
      let currData = new Date(new Date(new Date().toLocaleDateString()).getTime())
      let startDate = new Date(startTime.replace(/-/g, '/'))
      if (currData.getTime() < startDate.getTime()) {
        currData = startDate
      }
      let endData = Date.parse(val.replace(/-/g, '/'))
      dateSpan = endData - currData
      if (dateSpan <= 0) {
        iDays = 0
      } else {
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000))
      }
      return '剩余' + iDays + '天'
    },
    formatRemingNumTypeUnit (val) {
      if (val === '2') {
        return '周'
      }
      return '天'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/global.less';
.wrapper{
  .rem(margin,25);
  font-family:MicrosoftYaHei;
  .userinfo-wrapper{
    .head-img{
      .rem(width,95);
      .rem(height,95);
      border-radius: 10px;
      float: left;
    }
    .info{
      float: left;
      margin-left: 10px;
      .name{
        display: block;
        padding-left: 10px;
        .rem(font-size,30);
        color: #FFFFFF;
      }
      .username{
        display: block;
        background: #80BEE5;
        border-radius: 10px;
        color: #FFFFFF;
        .rem(font-size,18);
        padding: 0 10px;
        .rem(margin-top,10);
      }
    }
  }
  .list-wrapper__nodata{
    .rem(margin-top,140);
    .rem(margin-bottom,260);
    width: 100%;
    text-align: center;
    img{
      .rem(width,507);
      .rem(height,376);
      margin: auto;
    }
    span{
      .rem(font-size,30);
      .rem(margin-top,20);
      display: block;
      font-weight:400;
      color:rgba(255,254,254,1);
      margin: auto;
    }
  }
  .list-wrapper{
    .rem(margin-top,20);
    ul{
      li{
        .rem(margin-bottom,20);
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 4px 0px rgba(0,46,89,0.2);
        border-radius:10px;
        .rem(padding,30);

        .remind-info{
          position: relative;
          font-weight:400;
          .switch{
            position:absolute;
            right: 0;
            top: 0;
          }
          .title{
            .rem(font-size,30);
            color:rgba(0,0,0,1);
            .rem(margin-bottom,20);
          }
          .spec{
            .rem(font-size,26);
            color:rgba(136,136,136,1);
            .rem(margin-bottom,20);
          }
          .time{
            span{
              .rem(height,40);
              .rem(line-height,40);
              float: left;
              .rem(margin-right,40);
              .rem(margin-bottom,10);
              background:rgba(1,210,216,1);
              border-radius:10px;
              .rem(font-size,20);
              .rem(padding,10);
              .rem(padding-left,15);
              .rem(padding-right,15);
              color:rgba(255,255,255,1);
              .rem(letter-spacing,5);
            }
          }
          .share{
            .rem(margin-top,30);
            .rem(font-size,25);
            color:rgba(0,0,0,1);
            img{
              .rem(margin-right,30);
              .rem(width,34);
              .rem(height,34);
              float: left;
            }
            span{
              display: block;
              float: left;
              .rem(line-height,36);
            }
          }
        }
      }
    }
  }
  .btn-wrapper{
    .rem(font-size,60);
    .rem(margin-top,30);
    .rem(margin-bottom,80);
  }
}
</style>
