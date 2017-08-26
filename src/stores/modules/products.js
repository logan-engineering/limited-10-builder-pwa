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
    getAllProducts ({commit}) {
      shopifyClient.getProducts(({products}) => {
        products = configureProducts(config, products);
        commit(types.RECEIVE_PRODUCTS, {products});
      });
    }
  };

  // mutations
  const mutations = {
    [types.RECEIVE_PRODUCTS] (state, {products}) {
      state.all = products;
    },

    [types.ADD_TO_CART] (state, {id}) {
      state.all.find(p => p.id === id).inventory--;
    }
  };

  return {
    state,
    getters,
    actions,
    mutations
  };
}
