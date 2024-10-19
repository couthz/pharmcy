<template>
<div class="wy-content">
  <div class="category-top">
    <header class='weui-header'>
      <search message="输入药品名称" />
    </header>
  </div>
  <aside>
    <div class="menu-left scrollbar-none" id="sidebar">
      <ul>
        <li v-for="(category,index) in categorys" :class="{ 'active' : currCategory === category.ctgId }" :key="index" @click="categoryClick(category.ctgId)">
          {{category.ctgName}}
        </li>
      </ul>
    </div>
  </aside>
  <section class="menu-right padding-all j-content">
    <ul>
      <li class="w-3" v-for="(goodsModel,index) in goodsList" :key="index">
        <router-link :to="{name: 'goods_info',params: {id: goodsModel.goodsId}}"></router-link>
        <img v-lazy="goodsModel.goodsImg">
        <span>{{ goodsModel.goodsName }}</span>
        <span>¥{{ goodsModel.goodsPrice }}/{{ goodsModel.goodsUnit }}</span>
      </li>
    </ul>
    <div v-if="goodsList" class="morelinks">
      <router-link :to="{name:'goods_list',params:{id: currCategory}}">查看更多 >></router-link>
    </div>
  </section>
</div>
</template>

<script>
import Search from '@/components/Search.vue'
import { getCategorys, getGoods } from '@/api/goods'
import loading from '@/utils/loading'

export default {
  name: 'home_category',
  data () {
    return {
      currCategory: '',
      categorys: [],
      goodsList: null
    }
  },
  components: {
    Search
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const self = this
      loading.show()
      getCategorys().then(res => {
        self.categorys = res.list
        if (self.categorys.length !== 0) {
          self.currCategory = res.list[0].ctgId
          getGoods(self.currCategory, 4).then(goodsRes => {
            self.goodsList = goodsRes.list
            loading.hide()
          })
        }
      })
    },
    categoryClick (ctgId) {
      loading.show()
      this.currCategory = ctgId
      getGoods(this.currCategory, 4).then(res => {
        this.goodsList = res.list
        loading.hide()
      })
    }
  }
}
</script>
