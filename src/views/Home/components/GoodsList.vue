<template>
  <div class="wy-Module" id="lessgoods">
    <div class="wy-Module-tit-line"><span>{{title}}</span></div>
    <div class="wy-Module-con" id="recgoods">
      <ul class="wy-pro-list clear">
        <li v-for="(goods,index) in goodsList" :key="index">
          <router-link :to="{name: 'goods_info',params: {id: goods.goodsId}}">
            <div class="proimg">
              <img v-lazy="goods.goodsImg">
            </div>
            <div class="protxt">
              <div class="name">{{goods.goodsName}}</div>
              <div class="wy-pro-pri">¥<span>{{goods.goodsPrice}}/{{goods.goodsUnit}}</span></div>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="morelinks">
        <router-link :to="{name:'goods_list',params:{id: cid}}">查看更多 >></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Com_GoodsList',
  props: {
    title: {
      type: String
    },
    goodsList: {
      type: Array
    },
    cid: {
      type: String,
      default: ''
    }
  }
}
</script>
