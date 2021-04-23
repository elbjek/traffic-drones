import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import axios from 'axios';
import VueAxios from 'vue-axios';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faInstagram, faTwitter, faFacebookF,
} from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import router from './router';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap-grid.css';
import './assets/styles/main.scss';

library.add(faFacebookF);
library.add(faInstagram);
library.add(faTwitter);

if ((navigator.userAgent.indexOf('MSIE') !== -1) || (!!document.documentMode === true)) {
  document.body.className += 'ie-style';
}

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
