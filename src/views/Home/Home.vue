<template>
<div>
  <router-view/>
  <div class="foot-black"></div>
  <div class="weui-tabbar wy-foot-menu">
    <router-link :to="{name: 'home_index'}" class="weui-tabbar__item">
      <div class="weui-tabbar__icon foot-menu-home"></div>
      <p class="weui-tabbar__label">首页</p>
    </router-link>
    <router-link :to="{name: 'home_category'}" class="weui-tabbar__item">
      <div class="weui-tabbar__icon foot-menu-list"></div>
      <p class="weui-tabbar__label">分类</p>
    </router-link>
    <a :href="kfLink" class="weui-tabbar__item">
      <div class="weui-tabbar__icon foot-menu-consulat"></div>
      <p class="weui-tabbar__label">咨询药师</p>
    </a>
    <router-link :to="{name: 'home_mine'}" class="weui-tabbar__item">
      <div class="weui-tabbar__icon foot-menu-member"></div>
      <p class="weui-tabbar__label">我的</p>
    </router-link>
  </div>
</div>
</template>

<script>
import { getHeadquarters } from '@/api/system'

export default {
  name: 'home',
  data () {
    return {
      kfLink: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getHeadquarters().then(res => {
        this.kfLink = res.info.headqrterKflink
      })
    }
  }
}
</script>
