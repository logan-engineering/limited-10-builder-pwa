import * as types from '../mutation-types';
import { getFullProductTitle } from '../../services/cartUtil';

export function createCart (shopifyClient) {
  const state = {
    added: [],
    checkoutStatus: null
  };

  // getters
  const getters = {
    checkoutStatus: state => state.checkoutStatus
  };

  // actions
  const actions = {
    checkout ({commit, state}, products) {
      commit(types.CHECKOUT_REQUEST);
      setTimeout(function () {
        commit(types.CHECKOUT_SUCCESS);
      }, Math.random() * 1000);
    }
  };

  // mutations
  const mutations = {
    [types.ADD_TO_CART] (state, item) {
      state.lastCheckout = null;

      const title = getFullProductTitle(item.product);
      const value = item.option;
      const config = item.product.config;

      let existing = state.added.find(p => p.title === title);
      if (!existing) {
        existing = {
          title,
          values: []
        };
        state.added.push(existing);
      }
      setValue(existing, value, config);
    },

    [types.CHECKOUT_REQUEST] (state) {
      // clear cart
      state.added = {};
      state.checkoutStatus = null;
    },

    [types.CHECKOUT_SUCCESS] (state) {
      state.checkoutStatus = 'successful';
    },

    [types.CHECKOUT_FAILURE] (state, {savedCartItems}) {
      // rollback to the cart saved before sending the request
      state.added = savedCartItems;
      state.checkoutStatus = 'failed';
    }
  };

  return {
    state,
    getters,
    actions,
    mutations
  };
}

function setValue(item, value, config) {
  if (config.multiSelect) {
    if (!item.values.includes(value)) {
      item.values.push(value);
    } else {
      item.values.splice(item.values.indexOf(value), 1);
    }
  } else if (item.values.includes(value)) {
    // Already added; do nothing.
  } else if (item.values.length > 0) {
    item.values.splice(0, 1, value);
  } else {
    item.values.push(value);
  }
}
