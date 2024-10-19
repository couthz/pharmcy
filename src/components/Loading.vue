<template>
<div class="page loadmore js_show" v-show="show">
    <div class="page__bd">
        <div class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">{{ message }}</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: '数据正在加载中...'
    }
  }
}
</script>
