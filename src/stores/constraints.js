import { findCartItem, addProduct } from './modules/cart';
import * as types from './mutation-types';

let constraints = [];

export const actions = {
  configureConstraints ({state}) {
    constraints = createConstraints(state.products);
  },

  enforceConstraints (vuex, item) {
    constraints.forEach(c => {
      c.onchange(vuex, item);
    });
  },

  cleanupCart ({state, dispatch}, option) {
    if (option.enabled) {
      console.warn('option is enabled; nothing changing. Should not be here');
      return;
    }
    const {existing} = findCartItem(option.product, state.cart);
    const found = existing && existing.values.find(i => i.value === option.value);
    if (found) {
      addProduct(dispatch, found.product);
    }
  }
};

export const mutations = {
  [types.APPLY_CONSTRAINT] (state, {option, enabled}) {
    option.enabled = enabled;
  }
};

function createConstraints ({all, variations, options}) {
  const constraints = [];
  variations
    .forEach(v => {
      if (v.variation.config.constraints) {
        const c = v.variation.config.constraints.map(createConstraint.bind(null, v.variation, all));
        constraints.push(...c);
      }
    });
  return constraints;
}

function createConstraint (self, allProducts, rule) {
  const peer = findPeer(allProducts, rule.when.source);
  const targets = findTargets(self.options, rule);
  const shouldEnforce = createCheckFn(rule.when);
  let isActive = false;

  function enforce ({commit, dispatch}) {
    if (isActive) {
      return;
    }
    targets.forEach(option => {
      commit(types.APPLY_CONSTRAINT, {option, enabled: false});
      dispatch('cleanupCart', option);
    });
    isActive = true;
  }

  function free ({commit, dispatch}) {
    if (!isActive) {
      return;
    }
    targets.forEach(option => {
      commit(types.APPLY_CONSTRAINT, {option, enabled: true});
      // not needed cos the constraint is removed, right? - dispatch('cleanupCart', option);
    });
    isActive = false;
  }

  return {
    // BEGIN for debug only
    // title: self.title,
    // peer: peer.title,
    // get isActive () {
    //   return isActive;
    // },
    // END for debug only
    onchange (vuex, {product, option}) {
      if (product !== peer) {
        return;
      }
      if (shouldEnforce(option)) {
        enforce(vuex);
      } else {
        free(vuex);
      }
    }
  };
}

function createCheckFn (rule) {
  if (rule.hasOwnProperty('is')) {
    return (option) => option.value === rule.is;
  }

  if (rule.hasOwnProperty('in')) {
    return (option) => rule.in.includes(option.value);
  }

  if (rule.hasOwnProperty('greaterThan')) {
    return (option) => option.value > rule.greaterThan;
  }

  console.warn(`could not create check function for "${rule}"`);
}

function findPeer (products, source) {
  const [needle, ...rest] = source.split('.');
  let product = products.find(p => p.title === needle);

  if (!product || (rest.length && !product.variations)) {
    console.warn(`Could not locate peer for "${source}"; possible misconfiguration`);
  } else if (rest.length && product.variations) {
    product = findPeer(product.variations, rest.join('.'));
  }
  return product;
}

function findTargets (options, rule) {
  const values = rule.enable || rule.disable;
  if (rule.enable) {
    return options.filter(o => !values.includes(o.value));
  } else {
    return options.filter(o => values.includes(o.value));
  }
}
