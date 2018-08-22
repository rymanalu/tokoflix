import Vue from 'vue'
import Vue2Filters from 'vue2-filters'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Vue2Filters)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
