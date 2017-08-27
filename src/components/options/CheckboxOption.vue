<template>
    <label>
      <input type="checkbox" :disabled="disabled" :checked="checked">
    </label>
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
      checked () {
        const disabled = this.options.find(o => !o.enabled);

        return (disabled) ? disabled.value : false;
      },
      disabled () {
        return !!this.options.find(o => !o.enabled);
      }
    }
  };
</script>
