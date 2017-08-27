<template>
  <div id="app">
    <h1>Shopping Cart Example</h1>
    <hr>
    <h2>Products</h2>
    <product-list-container></product-list-container>
    <hr>
    <cart></cart>
  </div>
</template>

<script>
  import ProductListContainer from './ProductListContainer.vue';
  import Cart from './Cart.vue';

  export default {
    components: {
      ProductListContainer,
      Cart
    }
  };
</script>
