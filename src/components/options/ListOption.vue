<template>
  <ul>
    <li v-for="o in options">
      <label>
        <input :type="type" :name="product.title" :enabled="o.enabled">
        {{o.value}}
      </label>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
</style>

<script>
  export default {
    props: {
      options: Array,
      product: Object
    },
    computed: {
      type () {
        return this.product.config.multiSelect ? 'checkbox' : 'radio';
      }
    }
  };
</script>
