<template>
  <div>
    <store-product />
  </div>
</template>

<script>
  export default {
    name: 'StoreInicio',
    components: {
      StoreProduct: () => import('./StoreProduct'),
    },
  }
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #00CAE3;
  }
</style>
