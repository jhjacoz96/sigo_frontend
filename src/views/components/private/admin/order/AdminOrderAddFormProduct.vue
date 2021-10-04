<template>
  <v-card>
    <v-card-title>
      Carrito
      <v-spacer />
      <admin-order-add-form-product-add />
    </v-card-title>
    <admin-order-add-form-product-list />
  </v-card>
</template>

<script>
  export default {
    name: 'AdminOrderAddFormProduct',
    components: {
      AdminOrderAddFormProductList: () => import('./AdminOrderAddFormProductList'),
      AdminOrderAddFormProductAdd: () => import('./AdminOrderAddFormProductAdd'),
    },
  }
</script>
