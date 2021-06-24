<template>
  <div class="operation">
    <span @click="doLogin(true)">登录</span>
      | 
    <span @click="doLogin('')">注册</span>
  </div>
</template>

<script>
export default {
  name: 'HeadLogin',
  data() {
    return {
    }
  },
  mounted() {},
  methods: {
    doLogin(isLogin) {
      this.$emit('doLogin', isLogin)
    }
  }
}
</script>

<style lang='scss' scoped>
  .operation {
    color: white;
    font-size: 14px;
  }
</style>
