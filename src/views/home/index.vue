<template>
  <header class="header">
    <i class="el-icon-search"></i>
    <span class="address">{{ defaultLocation.name }}</span>
    <HeadLogin @doLogin="doLogin"></HeadLogin>
  </header>
  <main>
    home 
  </main>
</template>

<script>
import HeadLogin from '@/components/head-login.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    HeadLogin
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['defaultLocation'])
  },
  methods: {
    doLogin(isLogin) {
      this.$router.push({
        name: 'Login',
        params: { isLogin }
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
}
</style>
