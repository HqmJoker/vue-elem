<template>
  <header class="header">
    <i class="icon el-icon-arrow-left" @click="goBack"></i>
    <span>{{ isLogin ? '密码登录' : '账号注册' }}</span>
    <span></span>
  </header>
  <main class="main">
    登录 
  </main>
</template>

<script>

export default {
  data() {
    return {
      isLogin: false,
    }
  },
  mounted() {
    this.isLogin = this.$route.params.isLogin;
  },
  methods: {
    goBack() {
      history.go(-1)
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
  font-weight: 600;
  .icon {
    font-weight: 600;
    font-size: 20px;
  }
}
.main {
  background-color: #f8f8f8;
}
</style>
