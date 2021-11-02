<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="ordersComputed"
      :loading="loadingState"
      :items-per-page="5"
      disable-sort
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
      </template>
      <template v-slot:item.total="{ item }">
        {{ item.total }} {{ currencyGetter }}
      </template>
    </v-data-table>
    <store-order-detail
      :dialog.sync="dialog"
      :order.sync="order"
    />
  </div>
</template>

<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
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
          { text: 'Tipo de pago', value: 'type_payment' },
          { text: 'Estado', value: 'status' },
          { text: 'total', value: 'total' },
          { text: 'Fecha', value: 'created_at' },
          { text: 'Acciones', value: 'accion' },
        ],
        order: {},
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapGetters('auth', ['currencyGetter']),
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
        this.SET_LOADING(true)
        const serviceResponse = await getOrdersApi()
        if (serviceResponse.ok) {
          this.ordersComputed = serviceResponse.data
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.SET_LOADING(false)
      },
      showDetails (item) {
        this.order = item
        this.dialog = true
      },
    },
  }
</script>
