import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import {createProductStore} from './modules/products';
import {createCart} from './modules/cart';
import { createLogger } from '../services/logger';

const debug = process.env.NODE_ENV !== 'production';

export function createStore (config, shopifyClient) {
  const products = createProductStore(config, shopifyClient);
  const cart = createCart(shopifyClient);

  return new Vuex.Store({
    actions,
    getters,
    modules: {
      cart,
      products
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
  });
}
