<template>
<div class="weui-search-bar" :class="{'weui-search-bar_focusing':isfocusing}">
  <form class="weui-search-bar__form">
      <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input type="search" class="weui-search-bar__input" ref="searchInput" @keyup.13="searchClick()" v-model="key" :placeholder="message">
          <a href="javascript:" class="weui-icon-clear" id="searchClear" @click="searchClearClick"></a>
      </div>
      <label class="weui-search-bar__label" id="searchText" @click="searchTextClick">
          <i class="weui-icon-search"></i>
          <span>{{ message }}</span>
      </label>
  </form>
  <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel" @click="searchCancelClick">取消</a>
  <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel" @click="searchClick">确定</a>
</div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      isfocusing: false,
      key: ''
    }
  },
  props: {
    message: {
      type: String
    },
    searchUrl: {
      type: String
    }
  },
  methods: {
    searchTextClick () {
      this.isfocusing = true
      this.$refs.searchInput.focus()
    },
    searchCancelClick () {
      this.key = ''
      this.isfocusing = false
      this.$refs.searchInput.blur()
    },
    searchClearClick () {
      this.key = ''
      this.$refs.searchInput.focus()
    },
    searchClick () {
      const self = this.$root
      if (this.key === '') {
        this.$weui.alert('请输入有效的关键词！！！')
        return
      }
      this.$refs.searchInput.blur()
      self.$router.push({ name: 'search', query: { key: this.key } })
    }
  }
}
</script>
