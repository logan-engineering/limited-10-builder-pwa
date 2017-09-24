<template>
  <section class="section">
    <h1>Gun Builder Constraint Checker</h1>
    <div id="app" class="content">
      <h2>Select Options</h2>
      <product-list-container></product-list-container>

      <!--
      don't think we need a cart.
      <div class="column">
        <h2>Cart</h2>
        <cart></cart>
      </div>
      -->
    </div>
  </section>
</template>

<style lang="scss">
  @import '~bulma';

  html {
    font-size: 12px;
  }

  h1 {
    @extend .title;
    @extend .is-1;
  }
  h2 {
    @extend .subtitle;
    @extend .is-2;
  }
  h3 {
    @extend .subtitle;
    @extend .is-3;
  }
  h4 {
    @extend .subtitle;
    @extend .is-4;
  }

  body {
    font-size: .8rem;
  }

  body li li {
    margin-left: 10px;
  }
</style>

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
