<template>
  <a :disabled="isDisabled" class="button" :class="{'is-success': selectedOption.value}" @click="toggleCart">
    {{product.title}}
  </a>
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
      selectedOption () {
        const title = getFullProductTitle(this.product);
        const cartItem = this.cart.find(p => p.title === title);
        return cartItem ? cartItem.values[0] : this.options[0];
      },
      isDisabled () {
        return !!this.options.find(o => !o.enabled);
      }
    },
    methods: {
      ...mapActions([
        'addToCart'
      ]),
      toggleCart () {
        const option = this.options.find(o => o !== this.selectedOption);
        this.addToCart({product: this.product, option});
      }
    }
  };
</script>
