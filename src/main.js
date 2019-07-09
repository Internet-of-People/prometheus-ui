import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faAngleRight);
Vue.component('fa', FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: 'vFields',
  // This is not required but avoids possible naming conflicts
  errorBagName: 'vErrors',
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
