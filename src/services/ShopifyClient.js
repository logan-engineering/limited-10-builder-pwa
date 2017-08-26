import ShopifyBuy from 'shopify-buy';

export function ShopifyClient (config) {
  const store = {};
  const client = ShopifyBuy.buildClient(config.client);
  let cart;

  client.createCart().then(function (newCart) {
    cart = newCart;
  });

  const isLoaded = () => {
    return store.products && store.collection;
  };

  const cloneArray = array => {
    return array.slice(0);
  };

  const sortProducts = () => {
    if (!config.products.sortOrder) {
      return;
    }
    const sortOrder = cloneArray(config.products.sortOrder);
    const nonConfiguredProducts = cloneArray(config.products.sortOrder);
    const unsortableProducts = [];

    // Normalize casing
    sortOrder.forEach((value, index) => {
      sortOrder[index] = value.toLowerCase();
      nonConfiguredProducts[index] = value.toLowerCase();
    });

    // `productComparer` is used to sort the product array using `Array.prototpe.sort()`. Since every product goes
    // through this function we'll also use it to track unconfigured and unsortable products
    const productComparer = (a, b) => {
      // Normalize casing for each product title
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();

      // Get each item's index
      let indexA = sortOrder.indexOf(nameA);
      let indexB = sortOrder.indexOf(nameB);

      // push unsortables to the end of the list
      if (indexA === -1) {
        indexA = sortOrder.length;

        // track unsortables
        if (!unsortableProducts.includes(nameA)) {
          unsortableProducts.push(nameA);
        }
        // remove found items from unconfigured items list
      } else if (nonConfiguredProducts.includes(nameA)) {
        nonConfiguredProducts.splice(nonConfiguredProducts.indexOf(nameA), 1);
      }

      // for consistency, unsortables should have same index whether they're "a" or "b"
      if (indexB === -1) {
        indexB = sortOrder.length;
        // track unsortables
        if (!unsortableProducts.includes(nameB)) {
          unsortableProducts.push(nameB);
        }
      }

      // indicate the sort relationship to the caller
      return indexA - indexB;
    };

    store.products.sort(productComparer);

    if (nonConfiguredProducts.length) {
      console.warn(`Could not sort "${nonConfiguredProducts.join(',')}" because they're not in the product list.`);
    }
    if (unsortableProducts.length) {
      console.warn(`Could not sort "${unsortableProducts.join(',')}" because their order is not configured.`);
    }
  };

  this.fetch = () => {
    return new Promise((resolve, reject) => {
      const maybeReturn = () => {
        if (isLoaded()) {
          resolve(store);
        }
      };

      const unpackResponse = (response) => {
        return response.map((item) => {
          return item.attrs;
        });
      };

      client.fetchCollection(config.collection.id)
        .then(function (response) {
          store.collection = unpackResponse([response])[0];
          maybeReturn();
        })
        .catch(reject);

      client.fetchQueryProducts({collection_id: config.collection.id})
        .then(function (response) {
          store.products = unpackResponse(response);
          sortProducts();
          maybeReturn();
        })
        .catch(reject);
    });
  };

  this.addToCart = (variants, quantity) => {
    const items = variants.map((variant) => {
      return {
        variant,
        properties: {
          '_Custom Property': 'My name is Earl'
        },
        quantity};
    });

    return cart.createLineItemsFromVariants.apply(cart, items);
  };
}
