import { deepCopy } from './util';
import ShopifyBuy from 'shopify-buy';

export function ShopifyClient (config) {
  let products, collection;
  const client = ShopifyBuy.buildClient(config.client);

  const isLoaded = () => {
    return products && collection;
  };

  // TODO: Return a promise
  this.getProducts = (resolve) => {
    const reject = (err) => {
      console.error('error loading product', err);
    };
    // return new Promise((resolve, reject) => {
    const maybeReturn = () => {
      if (isLoaded()) {
        resolve({
          collection,
          products
        });
      }
    };

    // The Shopify Client wraps the raw response in a class, which we just toss. The raw props are on an "attrs" object
    // so we copy those and treat them as the raw data.
    const unpackResponse = (response) => {
      return response.map((item) => {
        return deepCopy(item.attrs);
      });
    };

    client.fetchCollection(config.collection.id)
      .then(function (response) {
        collection = unpackResponse([response])[0];
        maybeReturn();
      })
      .catch(reject);

    client.fetchQueryProducts({collection_id: config.collection.id})
      .then(function (response) {
        products = unpackResponse(response);
        maybeReturn();
      })
      .catch(reject);
  };
}
