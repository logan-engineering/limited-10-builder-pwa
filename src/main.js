// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './components/App.vue';
import Vuex from 'vuex';
import { createStore } from './stores/store';
import { CurrencyFilter } from './services/CurrencyFilter';
import * as config from './sample-config';
import { ShopifyClient } from './services/ShopifyClient';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(CurrencyFilter);

const client = new ShopifyClient(config.shopify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  store: createStore(config, client)
});
