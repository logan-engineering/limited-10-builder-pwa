<template>
  <div @click="toggleCart"
      :class="{
          selected: selectedOption.value,
          disabled: !selectedOption.enabled
        }">
      <span>
        {{product.title}}
      </span>
  </div>
</template>

<style lang="scss" scoped>
  .selected {
    background: #f00;
  }
  .disabled {
    background: grey;
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
      }
    },
    methods: {
      ...mapActions([
        'addToCart'
      ]),
      toggleCart () {
        const option = this.options.find(o => o !== this.selectedOption);
        console.log('toggle', option.value);
        this.addToCart({product: this.product, option});
      }
    }
  };
</script>
