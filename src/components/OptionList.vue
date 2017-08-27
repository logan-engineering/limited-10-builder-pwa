<template>
  <component :is="componentType" :options="options" :product="product"></component>
</template>

<style lang="scss">
</style>

<script>
  import ListOption from './options/ListOption.vue';
  import CheckboxOption from './options/CheckboxOption.vue';
  import TextboxOption from './options/TextBoxOption.vue';

  export default {
    components: {
      ListOption,
      CheckboxOption,
      TextboxOption
    },

    props: {
      options: Array,
      product: Object
    },

    computed: {
      componentType () {
        const valueType = this.product.config.type || String;
        switch (valueType) {
          case Boolean: {
            return 'checkbox-option';
          }
          case 'textbox': {
            return 'textbox-option';
          }
          default: {
            return 'list-option';
          }
        }
      }
    }
  };
</script>
