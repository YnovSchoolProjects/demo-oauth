import Vue from 'vue';
import router from './plugins/router';
import store from './plugins/store/store';
import vuetify from './plugins/vuetify';
import './plugins/container';
import './plugins/sentry';
import './plugins/vee-validate';
import './plugins/truncate-filter';
import App from './App.vue';

Vue.config.productionTip = false;

const app = new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
