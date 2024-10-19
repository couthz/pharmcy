<template>
  <div class="tab">
    <div class="tab-bar">
      <div :class="tabCls(item)"
        v-for="(item,index) in navList" :key="index"
        @click="handleChange(index)">
        {{ item.label }}
      </div>
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    value: {
      type: [String, Number]
    }
  },
  data () {
    return {
      currentValue: this.value,
      navList: []
    }
  },
  methods: {
    tabCls (item) {
      return [
        'tab-bar-item',
        {
          'tab-bar-item-active': item.name === this.currentValue
        }
      ]
    },
    handleChange (index) {
      var nav = this.navList[index]
      var name = nav.name
      this.currentValue = name
      this.$emit('input', name)
      this.$emit('on-click', name)
    },
    getTabs () {
      return this.$children.filter(function (item) {
        return item.$options.name === 'Pane'
      })
    },
    updateNav () {
      this.navList = []
      var _this = this
      this.getTabs().forEach(function (pane, index) {
        _this.navList.push({
          label: pane.label,
          name: pane.name || index
        })
        if (!pane.name) pane.name = index
        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = pane.name || index
          }
        }
      })
      this.updatStatus()
    },
    updatStatus () {
      var tabs = this.getTabs()
      var _this = this
      tabs.forEach(function (tab) {
        tab.show = tab.name === _this.currentValue
      })
    }
  },
  watch: {
    value: function (val) {
      this.currentValue = val
    },
    currentValue: function () {
      this.updatStatus()
    }
  }
}
</script>
