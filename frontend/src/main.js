import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import { store } from './store';
import { router } from './router';

Vue.config.productionTip = false
Vue.use(VeeValidate);

export const config = {
  apiUrl: "http://localhost:3002"
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
