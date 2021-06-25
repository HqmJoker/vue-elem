<template>
  <header class="header">
    <i class="el-icon-search" @click="goSearch"></i>
    <span class="address" @click="goLocation">{{ defaultLocation.name }}</span>
    <HeadLogin></HeadLogin>
  </header>
  <main class="main">
    home 
    <p v-for="i in 100" :key="i">text{{ i }}</p>
  </main>
  <Tabbar class="tabbar" :activeIndex="0"></Tabbar>
</template>

<script>
import HeadLogin from '@/components/head-login.vue'
import Tabbar from '@/components/tabbar.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    HeadLogin,
    Tabbar
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['defaultLocation'])
  },
  methods: {
    // 跳转到搜索页面
    goSearch() {
      this.$router.push({
        name: 'Search'
      })
    },
    // 跳转到修改位置
    goLocation() {
      this.$router.push({
        name: 'Location'
      })
    }
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
