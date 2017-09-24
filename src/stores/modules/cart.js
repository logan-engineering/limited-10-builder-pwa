import * as types from '../mutation-types';
import { getFullProductTitle } from '../../services/cartUtil';
import { getDefaultEnabledValues } from './products';

export function createCart (shopifyClient) {
  const state = {
    added: [],
    checkoutStatus: null
  };

  const getters = {
    checkoutStatus: state => state.checkoutStatus
  };

  const actions = {
    checkout ({commit, state}, products) {
      commit(types.CHECKOUT_REQUEST);
      setTimeout(function () {
        commit(types.CHECKOUT_SUCCESS);
      }, Math.random() * 1000);
    }
  };

  const mutations = {
    [types.ADD_TO_CART] (state, item) {
      state.lastCheckout = null;

      const value = item.option;
      const config = item.product.config;

      let {title, existing} = findCartItem(item.product, state);

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

export function findCartItem(product, state) {
  const title = getFullProductTitle(product);
  const existing = state.added.find(p => p.title === title);
  return {title, existing};
}

export function setValue(item, value, config) {
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

export function addProduct (dispatch, product) {
  const enabledValues = getDefaultEnabledValues(product);
  if (enabledValues.length === 0 && product.options.length > 0) {
    console.warn(`Could not set default value on product ${product.title}. The requested value does not exist.`);
  } else {
    enabledValues.forEach(setValue);
  }

  function setValue (option) {
    dispatch('addToCart', {
      product,
      option
    });
  }
}
