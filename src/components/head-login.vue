<template>
  <div class="operation" v-if="!isLogin">
    <span @click="doLogin(true)">登录</span>
      | 
    <span @click="doLogin(false)">注册</span>
  </div>
  <img class="avatar" v-if="isLogin" :src="avatar" alt="头像" @click="goMy" />
</template>

<script>
import { mapGetters } from 'vuex'
import avatar from '@/assets/default_avatar.png' 

export default {
  name: 'HeadLogin',
  data() {
    return {
      avatar
    }
  },
  emits: ['doLogin'],
  computed: {
    ...mapGetters(['isLogin'])
  },
  mounted() {
  },
  methods: {
    // 登录
    doLogin(isLogin) {
      this.$router.push({
        name: 'Login',
        params: { isLogin }
      })
    },
    // 跳转到我的页面
    goMy() {
      this.$router.push({
        name: 'My'
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .operation {
    color: white;
    font-size: 14px;
  }
  .avatar {
    width: 20px;
    height: 20px;
  }
</style>
