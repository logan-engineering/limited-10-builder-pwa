import * as types from './mutation-types';
import { getFullProductTitle } from '../services/cartUtil';
import { addProduct } from './modules/cart';

import { actions } from './constraints';

export const configureConstraints = actions.configureConstraints;
export const enforceConstraints = actions.enforceConstraints;
export const cleanupCart = actions.cleanupCart;

export const addToCart = ({commit, dispatch, state}, item) => {
  if (!item.option.enabled) {
    return;
  }

  const title = getFullProductTitle(item.product);
  const lineItem = state.cart.added.find(i => i.title === title);

  if (item.product.config.multiSelect || !lineItem || !lineItem.values.includes(item.option)) {
    commit(types.ADD_TO_CART, item);
    dispatch('updateSyncdItems', {title, selection: item.option});
    dispatch('enforceConstraints', item);
  }
};

export const updateSyncdItems = ({dispatch, state}, {title, selection}) => {
  state.products.all.forEach(syncItem);

  function syncItem (product) {
    if (product.config.master === title) {
      const option = product.options.find(o => o.value === selection.value);
      dispatch('addToCart', {product, option});
    }
    product.variations.forEach(syncItem);
  }
};

export const addDefaultItemsToCart = ({dispatch, state}) => {
  state.products.variations.forEach(item => {
    addProduct(dispatch, item.variation);
  });
};
