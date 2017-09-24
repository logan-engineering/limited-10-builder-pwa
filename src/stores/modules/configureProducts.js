import { deepCopy } from '../../services/util';

export function configureProducts (config, products) {
  const options = [];
  const variations = [];
  const all = config.products.map(pConf => {
    const p = deepCopy(
      products.find(p => p.title === pConf.title)
    );

    p.id = p.product_id;

    p.config = deepCopy(pConf);

    p.price = Number(p.variants[0].price);

    p.options = (p.config.options || []).map(createOption.bind(null, p));

    p.variations = (p.config.variations || []).map(createVariant.bind(null, options, variations, p));

    if (p.options.length) {
      options.push(...p.options.map(o => ({product: p, option: o})));
    }

    if (p.variations.length) {
      variations.push(...p.variations.map(v => ({product: p, variation: v})));
    }

    // All products are variations. Or is it vice versa? Or both?
    variations.push({product: null, variation: p});

    return p;
  });

  return {options, variations, all};
}

const createOption = (p, v) => ({product: p, value: v, enabled: true});

const createVariant = (options, variations, product, vConf) => {
  const p = {};

  p.parent = product;

  p.title = vConf.title;

  p.config = vConf;

  p.options = (p.config.options || []).map(createOption.bind(null, p));

  p.variations = (p.config.variations || []).map(createVariant.bind(null, options, variations, p));

  if (p.options.length) {
    options.push(...p.options.map(o => ({product: p, option: o})));
  }

  if (p.variations.length) {
    variations.push(...p.variations.map(v => ({product: p, variation: v})));
  }

  return p;
};
