import { configureProducts } from './configureProducts';
import * as types from '../mutation-types';

export function createProductStore (config, shopifyClient) {
  const state = {
    all: [], // This is really a product tree
    variations: [], // This is really a flattened product list, mapped to product ({product, variation})
    options: [] // This is a flattened list of all options, mapped to product ({product, option})
    // TODO: The flattened hierarchies have artificial links to product which is not needed since both option and
    // variation schemas include the parent product
  };

  const getters = {
    allProducts: state => state.all
    // TODO: This getter is probably useless
  };

  const actions = {
    async getAllProducts ({commit, dispatch}) {
      const products = await retrieveProducts(shopifyClient);
      commit(types.RECEIVE_PRODUCTS, {products});
      dispatch('configureConstraints', {productState: state});
    }
  };

  const mutations = {
    [types.RECEIVE_PRODUCTS] (state, {products}) {
      const {options, variations, all} = configureProducts(config, products);
      state.all = all;
      state.variations = variations;
      state.options = options;
    }
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

export function getDefaultEnabledValues (product) {
  // if product has no options just return
  if (product.options.length === 0) {
    return [];
  }

  const enabledOptions = product.options.filter(o => o.enabled);

  // If 1 or 0, are enabled, no need to keep hunting.
  if (enabledOptions.length === 0) {
    console.warn(`${product.title} has no options enabled.`);
    return enabledOptions;
  } else if (enabledOptions.length === 1) {
    // Product only has one option enabled.
    return enabledOptions;
  }

  // Otherwise, hunt away!
  const val = product.config.default;

  if (!val) {
    // Product has no default; returning first available.
    return [enabledOptions[0]];
  }

  if (Array.isArray(val)) {
    const selections = enabledOptions.filter(o => val.includes(o.value));
    if (selections.length > 0) {
      // Found enabled default options for product; returning them.
      return selections;
    }
  } else {
    const selection = enabledOptions.find(o => o.value === val);
    if (selection) {
      // Found enabled default option for product returning it.
      return [selection];
    }
  }

  // All defaults are disabled for product returning first available.
  return [enabledOptions[0]];
}
