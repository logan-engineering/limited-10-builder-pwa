<template>
  <ul>
    <li v-for="option in options"
        @click="addToCart({product, option})"
        :class="{
          selected: selections.includes(option),
          disabled: !option.enabled
        }">
      <span>
        {{option.value}}
      </span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  @import "../variables";
  .selected {
    background: $color-selected;
  }
  .disabled {
    background: $color-disabled;
  }
</style>

<script>
  import { getFullProductTitle } from '../../services/cartUtil';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    props: {
      options: Array,
      product: Object
    },
    computed: {
      ...mapGetters(['cart']),
      selections () {
        const title = getFullProductTitle(this.product);
        const cartItem = this.cart.find(p => p.title === title);
        return cartItem ? cartItem.values : [];
      }
    },
    methods: {
      ...mapActions([
        'addToCart'
      ])
    }
  };
</script>
