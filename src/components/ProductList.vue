<template>
  <ul>
    <li v-for="p in products">
      {{ p.title }} - {{ p.price | currency }}
      <br>
      <button
        @click="addToCart(p)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    computed: mapGetters({
      products: 'allProducts'
    }),
    methods: mapActions([
      'addToCart'
    ]),
    created () {
      this.$store.dispatch('getAllProducts');
    }
  };
</script>
