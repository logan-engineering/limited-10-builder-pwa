<template>
    <product-list :products="allProducts"></product-list>
</template>

<style lang="scss" scoped>
</style>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import ProductList from './ProductList.vue';

  export default {
    components: {
      ProductList
    },

    computed: mapGetters([
      'allProducts'
    ]),

    methods: mapActions([
      'addToCart'
    ]),

    created () {
      this.$store.dispatch('getAllProducts');
    }
  };
</script>
