<template>
  <v-data-table
    :headers="headers"
    :items="ordersComputed"
  >
    <template v-slot:item.created_at="{ item }">
      {{ moment(item.created_at).format('D-M-YYYY') }}
    </template>
    <template v-slot:item.accion="{ item }">
      <v-btn
        icon
        color="info"
        @click="showDetails(item)"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      <store-order-detail
        :dialog.sync="dialog"
        :order.sync="order"
      />
    </template>
  </v-data-table>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import {
    getOrdersApi,
  } from '@/api/services'
  export default {
    name: 'StoreOrderList',
    components: {
      StoreOrderDetail: () => import('./StoreOrderDetail'),
    },
    props: {
      orders: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
        dialog: false,
        headers: [
          { text: 'Código', value: 'code' },
          { text: 'total', value: 'total' },
          { text: 'Tipo de pago', value: 'type_payment' },
          { text: 'Estado', value: 'status' },
          { text: 'Fecha', value: 'created_at' },
          { text: 'Acciones', value: 'accion' },
        ],
        order: {},
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ordersComputed: {
        get () {
          return this.orders
        },
        set (value) {
          this.$emit('update:orders', value)
        },
      },
    },
    created () {
      this.getOrders()
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      async getOrders () {
        const serviceResponse = await getOrdersApi()
        if (serviceResponse.ok) {
          this.ordersComputed = serviceResponse.data
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      showDetails (item) {
        this.order = item
        this.dialog = true
      },
    },
  }
</script>
