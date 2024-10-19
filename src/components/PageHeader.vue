<template>
  <div class="wy-header">
    <div class="wy-header-icon-back" @click="back()"><span></span></div>
    <div class="wy-header-title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'page_header',
  props: {
    title: {
      type: String
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
