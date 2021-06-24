import router from './router'
import { getStore } from '@/utils/localStorage'
import { store } from '@/store/index.js'

const whiteList = [ 'Location', 'City' ]

router.beforeEach((to, from, next) => {
  const defaultLocation = store.state.location.defaultLocation || getStore('defaultLocation')
  // 用户是否已经填写地址
  if( defaultLocation || whiteList.includes(to.name)) {
    if(defaultLocation) {
      store.dispatch('location/setLocation', defaultLocation)
    }
    next()
  } else {
    next({
      name: 'Location'
    })
  }

})