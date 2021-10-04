<template>
  <v-card>
    <v-card-title>
      Carrito
      <v-spacer />
      <admin-entry-add-form-product-add />
    </v-card-title>
    <admin-entry-add-form-product-list />
  </v-card>
</template>

<script>
  export default {
    name: 'AdminEntryAddFormProduct',
    components: {
      AdminEntryAddFormProductList: () => import('./AdminEntryAddFormProductList'),
      AdminEntryAddFormProductAdd: () => import('./AdminEntryAddFormProductAdd'),
    },
  }
</script>
