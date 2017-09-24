<template>
    <product-list :products="allProducts" style="display: flex; flex-wrap: wrap;"></product-list>
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

    async created () {
      await this.$store.dispatch('getAllProducts');
      this.$store.dispatch('addDefaultItemsToCart');
    }
  };
</script>
