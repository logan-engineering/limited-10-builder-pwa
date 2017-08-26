import { deepCopy } from '../../services/util';

export function configureProducts (config, products) {
  return config.products.map(pConf => {
    const p = deepCopy(
      products.find(p => p.title === pConf.name)
    );
    p.config = pConf;
    p.price = Number(p.variants[0].price);
    return p;
  });
}
