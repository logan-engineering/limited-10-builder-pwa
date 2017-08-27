import { deepCopy } from '../../services/util';

export function configureProducts (config, products) {
  return config.products.map(pConf => {
    const p = deepCopy(
      products.find(p => p.title === pConf.title)
    );

    p.config = deepCopy(pConf);

    p.price = Number(p.variants[0].price);

    p.options = (p.config.options || []).map(createOption);

    p.variations = (p.config.variations || []).map(createVariant);

    return p;
  });
}

const createOption = v => ({value: v, enabled: true});

const createVariant = (vConf) => {
  const p = {};

  p.title = vConf.title;

  p.config = vConf;

  p.options = (p.config.options || []).map(createOption);

  p.variations = (p.config.variations || []).map(createVariant);

  return p;
};
