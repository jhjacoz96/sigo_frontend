<template>
  <v-container fluid>
    <home-sale />
    <home-sale-client />
  </v-container>
</template>

<script>
  export default {
    name: 'HomeHome',
    components: {
      HomeSale: () => import('./HomeSale'),
      HomeSaleClient: () => import('./HomeSaleClient'),
    },
  }
</script>
