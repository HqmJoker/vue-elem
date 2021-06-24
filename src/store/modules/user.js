import { setStore } from '@/utils/localStorage'

const state = {
  userInfo: null, // 用户信息
  isLogin: false // 用户是否登录
}
const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
    state.isLogin = userInfo ? true : false;
  },

}
const actions = {
  // 修改默认城市
  setUserInfo({ commit }, userInfo) {
    setStore('userInfo', userInfo)
    commit('SET_USERINFO', userInfo)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}