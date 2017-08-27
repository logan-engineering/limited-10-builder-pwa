<template>
  <ul>
    <li v-for="p in products">
      {{ p.title }} - {{ p.price | currency }}
      <br>
      <option-list :options="p.options" :product="p"></option-list>
      <product-list :products="p.variations"></product-list>
    </li>
  </ul>
</template>

<script>
  import OptionList from './OptionList.vue';

  export default {
    name: 'product-list',

    components: {
      OptionList
    },

    props: {
      products: Array
    }
  };
</script>
