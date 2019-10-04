import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import VueClipboard from 'vue-clipboard2';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleRight,
  faAngleLeft,
  faCheckCircle,
  faCircleNotch,
  faUnlockAlt,
  faUserLock,
  faHeart,
  faWallet,
  faLaptop,
  faAddressCard,
  faFileSignature,
} from '@fortawesome/free-solid-svg-icons';
import {
  faLaughWink,
} from '@fortawesome/free-regular-svg-icons';
import {
  faGithub,
  faTelegram,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

library.add([
  faAngleLeft, // <fa icon="angle-left" />
  faAngleRight, // <fa icon="angle-right" />
  faCheckCircle, // <fa icon="check-circle"  />
  faCircleNotch, // <fa icon="circle-notch" />
  faDiscord, // <fa :icon="['fab', 'discord']" />
  faGithub, // <fa :icon="['fab', 'github']" />
  faLaughWink, // <fa :icon="['far', 'laugh-wink']" />
  faTelegram, // <fa :icon="['fab', 'telegram']" />
  faUnlockAlt, // <fa icon="unlock-alt" />
  faUserLock, // <fa icon="user-lock" />
  faHeart, // <fa icon="heart" />
  faWallet, // <fa icon="wallet" />
  faLaptop, // <fa icon="laptop" />
  faAddressCard, // <fa icon="address-card" />
  faFileSignature, // <fa icon="file-signature" />
]);
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
  mounted() {
    // Prevent blank screen in Electron builds
    this.$router.push('/');
  },
}).$mount('#app');
