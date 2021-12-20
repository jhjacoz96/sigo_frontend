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
          :tabs="permissionTabs"
          @click:filter="getOrders($event)"
        />
        <v-divider class="mt-4" />
        <admin-order-list
          ref="adminOrderList"
          :first-tab="permissionTabs.length > 0 ? this.tab : ''"
        />
      </v-container>
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'AdminOrder',
    components: {
      AdminOrderTab: () => import('./AdminOrderTab'),
      AdminOrderList: () => import('./AdminOrderList'),
    },
    data () {
      return {
        tabs: [
          {
            name: 'Por verificar',
            status: 'verificar',
            can: 'order.status_one',
          },
          {
            name: 'En proceso',
            status: 'proceso',
            can: 'order.status_two',
          },
          {
            name: 'Enviados',
            status: 'enviado',
            can: 'order.status_three',
          },
        ],
        tab: 'verificar'
      }
    },
    computed: {
      ...mapGetters('auth', ['canPermissionsGetter']),
      permissionTabs () {
        return this.tabs.filter(item => this.canPermissionsGetter(item.can))
      },
    },
    methods: {
      getOrders (status) {
        this.tab = status
        this.$refs.adminOrderList.getOrders(status)
      },
    },
  }
</script>
