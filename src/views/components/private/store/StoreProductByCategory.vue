<template>
  <div>
    <store-product />
  </div>
</template>
<script>
  export default {
    name: 'StoreCategoryProduct',
    components: {
      StoreProduct: () => import('./StoreProduct'),
    },
  }
</script>
