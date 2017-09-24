<template>
  <div v-if="isVisible()">
    <div class="content" v-for="p in products" style="display: flex;">
      <div v-if="hasChildren(p)" class="box">
        <component :is="level">
          {{ p.title }} - {{ p.price | currency }}
        </component>
        <product-list :products="p.variations"></product-list>
      </div>

      <div v-if="hasOptions(p)" class="panel">
        <div class="panel-heading">
            {{ p.title }} - {{ p.price | currency }}
        </div>
        <div class="panel-block">
          <option-list :options="p.options" :product="p"></option-list>
        </div>
      </div>

    </div>
  </div>
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
    },

    data () {
      return {
        level: getLevel(this.products[0])
      };
    },

    methods: {
      isVisible () {
        return this.products.length > 0;
      },
      hasOptions(product) {
        return product.options.length > 0;
      },
      hasChildren(product) {
        return product.variations.length > 0;
      }
    }
  };

  function getLevel (product) {
    let level = 2;
    while (product) {
      level++;
      product = product.parent;
    }
    return `h${level}`;
  }
</script>
