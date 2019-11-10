import Vue from 'vue'
import App from './App.vue'
import router from './router'
import container from './container'

container.set('router', router)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
