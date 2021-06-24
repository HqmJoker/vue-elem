const getters = {
  // location
  curLocation: state => state.location.curLocation,
  defaultLocation: state => state.location.defaultLocation,
  hotCities: state => state.location.hotCities,
  allCities: state => state.location.allCities,
  // user
  userInfo: state => state.user.userInfo,
  isLogin: state => state.location.isLogin,
}
export default getters