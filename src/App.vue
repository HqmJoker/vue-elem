<template>
  <router-view></router-view>
</template>

<script>
import { getStore } from '@/utils/localStorage'
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['defaultLocation', 'userInfo'])
  },
  mounted() {
    // 用户是否已经填写地址
    const defaultLocation = this.defaultLocation || getStore('defaultLocation');
    if(defaultLocation) {
      this.setLocation(defaultLocation);
    }
    // 判断用户是否登录
    const userInfo = this.userInfo || getStore('userInfo');
    this.setUserInfo(userInfo);
  },
  methods: {
    ...mapActions({
      setLocation: 'location/setLocation',
      setUserInfo: 'user/setUserInfo'
    })
  }
}
</script>
