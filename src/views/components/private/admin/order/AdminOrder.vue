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
      <v-btn
        color="primary"
        top
        right
        absolute
        to="/admin/pedido/agregar"
      >
        <span v-if="$vuetify.breakpoint.smAndUp">Agregar</span> <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-container class="text-center justify-center">
        <admin-order-tab
          @click:filter="getOrders($event)"
        />
        <v-divider class="mt-4" />
        <admin-order-list
          ref="adminOrderList"
        />
      </v-container>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'AdminOrder',
    components: {
      AdminOrderTab: () => import('./AdminOrderTab'),
      AdminOrderList: () => import('./AdminOrderList'),
    },
    data () {
      return {
      }
    },
    methods: {
      getOrders (status) {
        this.$refs.adminOrderList.getOrders(status)
      },
    },
  }
</script>
