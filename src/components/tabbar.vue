<template>
  <ul class="tabbar">
    <li class="tabbar-item" v-for="(tab, tabIndex) in tabbars" :key='tabIndex' :class=" { 'actived': activeIndex === tabIndex } " @click="switchTab(tab.name)">
      <i class="iconfont" :class="tab.iconName"></i>
      <span>{{ tab.text }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tabbars: [
        { text: '外卖', name: 'Home', iconName: 'icon-eliaomo' },
        { text: '搜索', name: 'Search', iconName: 'icon-liulanqi' },
        { text: '订单', name: 'Order', iconName: 'icon-OrderDetail' },
        { text: '我的', name: 'My', iconName: 'icon-mine' }
      ]
    }
  },
  methods: {
    switchTab(name) {
      this.$router.push({
        name
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  border-top: 1px solid #e4e4e4;
  padding: 5px 0;
  &-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    .iconfont {
      margin-bottom: 5px;
      font-size: 20px;
    }
  }
  .actived {
    color: #3190e8;
  }
}
</style>
