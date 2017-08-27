import * as types from './mutation-types';
import { getFullProductTitle } from '../services/cartUtil';

export const addToCart = ({commit, dispatch, state}, item) => {
  const title = getFullProductTitle(item.product);
  const lineItem = state.cart.added.find(i => i.title === title);

  if (item.product.config.multiSelect || !lineItem || !lineItem.values.includes(item.option)) {
    commit(types.ADD_TO_CART, item);
    dispatch('updateSyncdItems', {title, selection: item.option});
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

export const addDefaultItemsToCart = ({dispatch}, allProducts) => {
  allProducts.forEach(addProduct);

  function addProduct (product) {
    const val = product.config.default;
    if (val) {
      if (Array.isArray(val)) {
        val.forEach(setValue);
      } else {
        setValue(val);
      }
      // } else {
      //   console.warn(`Not setting default value for ${product.title} because none is configured`);
    }

    product.variations.forEach(addProduct);

    function setValue (val) {
      const option = product.options.find(o => o.value === val);
      if (!option) {
        console.warn(`Could not set default value of ${val} on product ${product.title}. The requested value does not exist.`);
        return;
      }
      dispatch('addToCart', {
        product,
        option
      });
    }
  }
};
