export const cartProducts = state => {
  return state.cart.added.map((item) => {
    // console.log('cartProducts getter', item);

    return {
    };
  });
};

export const cart = state => {
  return state.cart.added;
};
