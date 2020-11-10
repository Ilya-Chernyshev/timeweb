import Vue from 'vue';
import store from './store';
import router from './router';
import axios from 'axios';
import { BootstrapVue } from 'bootstrap-vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(axios);

new Vue({
	store,
	router,
  render: h => h(App),
}).$mount('#app')
