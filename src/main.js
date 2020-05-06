import Vue from 'vue';
import vueAwesomeCountdown from 'vue-awesome-countdown';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(vueAwesomeCountdown, 'vac');

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
