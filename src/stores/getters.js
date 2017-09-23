export const cartProducts = state => {
  return state.cart.added.map((item) => {
    return {
    };
  });
};

export const cart = state => {
  return state.cart.added;
};
