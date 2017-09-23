import { configureProducts } from './configureProducts';
import * as types from '../mutation-types';

export function createProductStore (config, shopifyClient) {
// initial state
  const state = {
    all: [],
    options: [],
    variations: []
  };

  // getters
  const getters = {
    allProducts: state => state.all
  };

  // actions
  const actions = {
    async getAllProducts ({commit, dispatch}) {
      const products = await retrieveProducts(shopifyClient);
      commit(types.RECEIVE_PRODUCTS, {products});
      dispatch('configureConstraints', {productState: state});
    }
  };

  // mutations
  const mutations = {
    [types.RECEIVE_PRODUCTS] (state, {products}) {
      const {options, variations, all} = configureProducts(config, products);
      state.all = all;
      state.variations = variations;
      state.options = options;
    },

    [types.APPLY_CONSTRAINT] (state, {option, enabled}) {
      const product = findProduct(state.options, option);
      console.log('constrain', product.title, option.value, option.enabled, '=>', enabled);
      option.enabled = enabled;
    }
  };

  return {
    state,
    getters,
    actions,
    mutations
  };
}

function findProduct (optionMap, option) {
  const i = optionMap.find(item => {
    return item.option === option;
  });
  return i && i.product;
}

function retrieveProducts (client) {
  return new Promise((resolve, reject) => {
    let products = localStorage.getItem('products');
    if (products) {
      return resolve(JSON.parse(products));
    }
    client.getProducts(({products}) => {
      localStorage.setItem('products', JSON.stringify(products));
      resolve(products);
    });
  });
}
