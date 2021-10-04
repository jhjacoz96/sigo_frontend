<template>
  <v-container fluid>
    <base-v-component
      heading="Categorias"
    />
    <store-category-list />
  </v-container>
</template>

<script>
  export default {
    name: 'StoreCategory',
    components: {
      StoreCategoryList: () => import('./StoreCategoryList'),
    },
  }
</script>
