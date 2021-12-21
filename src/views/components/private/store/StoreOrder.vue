<template>
  <v-container fluid>
    <base-material-card
      icon="mdi-shopping"
      color="secondary"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Pedidos
        </div>
      </template>
      <!-- <v-card-text>
          <store-order-filter/>
      </v-card-text> -->
      <store-order-list
        :orders.sync="orders"
      />
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'StoreOrder',
    components: {
      StoreOrderList: () => import('./StoreOrderList'),
    },
    data () {
      return {
        orders: [],
      }
    },
  }
</script>
