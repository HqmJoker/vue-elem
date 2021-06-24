import { setStore } from '@/utils/localStorage'

const state = {
  curLocation: null, // 当前位置,根据系统定位调取接口获得
  defaultLocation: null, // 默认位置,用户最后选择位置
  hotCities: [], // 热门城市
  allCities: null // 所有城市
}
const mutations = {
  SET_CURRENT_LOCATION: (state, city) => {
    state.curLocation = city;
  },
  SET_DEFAULT_LOCATION: (state, city) => {
    state.defaultLocation = city;
  },
  SET_HOT_CITIES: (state, cities) => {
    state.hotCities = cities;
  },
  SET_ALL_CITIES: (state, cities) => {
    state.allCities = cities;
  }
}
const actions = {
  // 修改默认城市
  setLocation({ commit }, city) {
    commit('SET_DEFAULT_LOCATION', city);
    setStore('defaultLocation', city);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}