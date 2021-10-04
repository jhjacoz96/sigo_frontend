<template>
  <v-container fluid>
    <admin-order-add-form />
  </v-container>
</template>

<script>
  export default {
    name: 'AdminOrderAdd',
    components: {
      AdminOrderAddForm: () => import('./AdminOrderAddForm'),
    },
  }
</script>
