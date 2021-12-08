<template>
  <v-card>
    <admin-client-sale-list />
  </v-card>
</template>
<script>
  export default {
    name: 'HomeSaleClient',
    components: {
      AdminClientSaleList: () => import('../client/AdminClientSaleList'),
    },
  }
</script>
