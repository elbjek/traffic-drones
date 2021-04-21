import axios from 'axios';
import VueAxios from 'vue-axios';

import { library } from '@fortawesome/fontawesome-svg-core';
// import { faFacebook } from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram, faTwitter, faFacebookF,
} from '@fortawesome/free-brands-svg-icons';
// import { faInstagram } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap-grid.css';
import './assets/scss/shared.scss';

library.add(faFacebookF);
library.add(faInstagram);
library.add(faTwitter);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
