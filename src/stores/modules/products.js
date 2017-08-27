import { configureProducts } from './configureProducts';
import * as types from '../mutation-types';

export function createProductStore (config, shopifyClient) {
// initial state
  const state = {
    all: []
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
    }
  };

  // mutations
  const mutations = {
    [types.RECEIVE_PRODUCTS] (state, {products}) {
      state.all = configureProducts(config, products);
    }

    // [types.ADD_TO_CART] (state, {id}) {
    //   state.all.find(p => p.id === id).inventory--;
    // }
  };

  return {
    state,
    getters,
    actions,
    mutations
  };
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
