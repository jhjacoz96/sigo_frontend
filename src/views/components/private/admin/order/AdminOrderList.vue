<template>
  <v-container class="text-center justify-center">
    <v-card>
      <v-card-title class="pa-3">
        <v-spacer />
        <base-text-field
          label="Buscar"
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :loading="loadingState"
        :items="orders"
        :options.sync="options"
        :server-items-length="totalItems"
        :page-count="numberOfPages"
        :footer-props="footerProps"
        :items-per-page="5"
        disable-sort
        :mobile-breakpoint="0"
      >
        <template v-slot:item.created_at="{ item }">
          {{ moment(item.created_at).format('D-M-YYYY') }}
        </template>
        <template v-slot:item.total="{ item }">
          {{ item.total }} {{ currencyGetter }}
        </template>
        <template v-slot:item.accion="{ item }">
          <v-btn
            v-if="canPermissionsGetter('order.show')"
            :disabled="loadingState"
            class="ml-1"
            color="primary"
            small
            icon
            @click="showItem(item)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn
            v-if="(item.status === 'verificar' || item.status === 'proceso') && canPermissionsGetter('order.verify')"
            :disabled="loadingState"
            class="ml-1"
            color="primary"
            small
            icon
            @click="editStatusItem(item)"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn
            v-if="item.status === 'verificar' && canPermissionsGetter('order.edit')"
            :disabled="loadingState"
            class="ml-1"
            color="primary"
            small
            icon
            @click="editItem(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            v-if="item.status === 'verificar' && canPermissionsGetter('order.delete')"
            :disabled="loadingState"
            color="primary"
            small
            icon
            @click="deleteItem(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <admin-order-confirm-delete
        :orders.sync="orders"
        :dialog-delete.sync="dialogDelete"
        :order.sync="order"
      />
      <admin-order-detail
        :dialog.sync="dialogShow"
        :order.sync="order"
      />
    </v-card>
  </v-container>
</template>

 <script>
  import { pagination } from '@/mixins/pagination'
  import { getOrdersAdminApi, updateOrderAdminApi } from '@/api/services'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  export default {
    name: 'AdminOrderList',
    components: {
      AdminOrderConfirmDelete: () => import('./AdminOrderConfirmDelete'),
      AdminOrderDetail: () => import('./AdminOrderDetail'),
    },
    mixins: [pagination],
    props: {
      firstTab: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        orders: [],
        headers: [
          {
            text: 'Código',
            align: 'center',
            value: 'code',
          },
          {
            text: 'Cliente',
            align: 'center',
            value: 'client.name',
          },
          {
            text: 'Tipo de pago',
            align: 'center',
            value: 'type_payment',
          },
          {
            text: 'Monto total',
            align: 'center',
            value: 'total',
          },
          {
            text: 'Fecha',
            align: 'center',
            value: 'created_at',
          },
          { text: 'Acciones', sortable: false, filterable: false, value: 'accion' },
        ],
        order: {
          code: null,
          client: undefined,
          type_payment: '',
          status: '',
          total: 0,
          created_at: '',
          products: [],
        },
        dialogDelete: false,
        dialogShow: false,
        itemsPerPage: 5,
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapGetters('auth', ['currencyGetter', 'canPermissionsGetter']),
    },
    watch: {
      options: {
        deep: true,
        handler () {
          this.getOrders(this.firstTab)
        },
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      openDetail (order) {
        // console.log(order)
      },
      confirmItem (event, order) {
        event.stopPropagation()
        // console.log(order)
      },
      async getOrders (status) {
        const params = {
          status,
          sizePage: this.options.itemsPerPage,
          page: this.options.page,
        }
        this.SET_LOADING(true)
        this.orders = []
        const serviceResponse = await getOrdersAdminApi(params)
        if (serviceResponse.ok) {
          this.orders = serviceResponse.data.orders
          this.paginate(serviceResponse.data.paginate)
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.SET_LOADING(false)
      },
      deleteItem (item) {
        this.dialogDelete = true
        this.order = item
      },
      async editStatusItem (item) {
        const data = item
        data.status = this.getStatusUtdate(data.status)
        const serviceResponse = await updateOrderAdminApi(item.id, item)
        if (serviceResponse.ok) {
          var index = this.orders.indexOf(item)
          this.orders.splice(index, 1)
          this.SET_ALERT({
            text: serviceResponse.message,
            color: 'success',
          })
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.SET_LOADING(false)
      },
      getStatusUtdate (status) {
        var res
        switch (status) {
          case 'verificar':
            res = 'proceso'
            break

          default:
            res = 'enviado'
        }
        return res
      },
      editItem (item) {
        this.$router.push(`/admin/pedido/editar/${item.id}`)
      },
      showItem (item) {
        this.order = item
        this.dialogShow = true
      },
    },
  }
 </script>
