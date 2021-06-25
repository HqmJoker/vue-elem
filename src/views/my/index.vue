<template>
  <header class="header">
    <i class="el-icon-arrow-left" @click="goBack"></i>
    <span>我的</span>
    <span></span>
  </header>
  <main>
    我的 
  </main>
  <Tabbar class="tabbar" :activeIndex="3"></Tabbar>
</template>

<script>
import Tabbar from '@/components/tabbar.vue'

export default {
  components: {
    Tabbar
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    // 返回上一级
    goBack() {
      history.go(-1)
    },
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: $blue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  color: white;
  height: 50px;
  box-sizing: border-box;
}
.main {
  width: 100%;
  height: calc(100vh - 50px - 50px); // 视图高度-头部高度-尾部高度
  overflow-y: auto;
}
</style>
