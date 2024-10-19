<template>
  <button :class="btnClass" @click="countDown">{{localContent}}</button>
</template>

<script>
export default {
  name: 'com_authcodebutton',
  data () {
    return {
      localContent: this.content,
      totalTime: this.time,
      canClick: true,
      clock: {}
    }
  },
  props: {
    time: {
      type: Number,
      default: 60
    },
    btnClass: {
      type: String,
      default: 'weui-vcode-btn'
    },
    content: {
      type: String,
      default: '发送验证码'
    }
  },
  methods: {
    countDown () {
      if (!this.canClick) return
      this.$emit('sendAuthCode')
      this.canClick = false
      this.localContent = this.totalTime + 's后重新发送'
      this.clock = window.setInterval(() => {
        this.totalTime--
        this.localContent = this.totalTime + 's后重新发送'
        if (this.totalTime <= 0) {
          window.clearInterval(this.clock)
          this.localContent = '发送验证码'
          this.totalTime = this.time
          this.canClick = true
        }
      }, 1000)
    },
    reset () {
      window.clearInterval(this.clock)
      this.localContent = '发送验证码'
      this.totalTime = this.time
      this.canClick = true
    }
  }
}
</script>
