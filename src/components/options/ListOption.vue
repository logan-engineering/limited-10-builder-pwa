<template>
  <div class="content" v-if="options.length > 0">
    <a v-for="option in options" :disabled="!option.enabled" class="button" :class="{'is-success': selections.includes(option)}" @click="addToCart({product, option})">
      {{option.value}}
    </a>
  </div>
</template>

<style lang="scss" scoped>
  a {
    margin-right: 5px;
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
