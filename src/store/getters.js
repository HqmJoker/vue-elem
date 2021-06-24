const getters = {
  curLocation: state => state.location.curLocation,
  defaultLocation: state => state.location.defaultLocation,
  hotCities: state => state.location.hotCities,
  allCities: state => state.location.allCities,
}
export default getters