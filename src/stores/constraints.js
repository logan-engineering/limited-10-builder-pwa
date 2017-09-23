import * as types from '../mutation-types';

export function createConstraintStore () {
  const state = {
    constraints: []
  };

  // actions
  const actions = {
    async configureConstraints ({commit}, {productState}) {
      commit(types.CONFIGURE_CONSTRAINTS, productState);
    },

    enforceConstraints ({commit, state}, item) {
      state.constraints.forEach(c => {
        c.onchange({commit}, item);
      });
    }
  };

  // mutations
  const mutations = {
    [types.CONFIGURE_CONSTRAINTS] (state, args) {
      state.constraints = createConstraints(args);
    }
  };

  return {
    state,
    actions,
    mutations
  };
}

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

function createConstraint(self, allProducts, rule) {
  const peer = findPeer(allProducts, rule.when.source);
  const targets = findTargets(self.options, rule);
  const shouldEnforce = createCheckFn(rule.when);
  let isActive = false;
  function enforce (commit) {
    if (isActive) {
      return;
    }
    targets.forEach(option => {
      commit(types.APPLY_CONSTRAINT, {option, enabled: false});
    });
    isActive = true;
  }
  function free (commit) {
    if (!isActive) {
      return;
    }
    targets.forEach(option => {
      commit(types.APPLY_CONSTRAINT, {option, enabled: true});
    });
    isActive = false;
  }

  return {
    title: self.title,
    peer: peer.title,
    get isActive () {
      return isActive;
    },
    onchange ({commit}, {product, option}) {
      if (product !== peer) {
        return;
      }
      if (shouldEnforce(option)) {
        enforce(commit);
      } else {
        free(commit);
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
