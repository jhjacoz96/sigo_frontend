<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data"
      :loading="loadingState"
      :search="search"
      :options.sync="options"
      :server-items-length="totalItems"
      :page-count="numberOfPages"
      :footer-props="footerProps"
      :mobile-breakpoint="0"
      :items-per-page="5"
      disable-sort
    >
      <template v-slot:item.document="{ item }">
        {{ item.document }}
      </template>
      <template v-slot:item.current_commission_sale="{ item }">
        {{ item.current_commission_sale }} {{ currencyGetter }}
      </template>
      <template v-slot:item.accion="{ item }">
        <v-btn
          color="info"
          small
          icon
          @click="detailItem(item)"
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn
          color="info"
          small
          icon
          @click="payItem(item)"
        >
          <v-icon>mdi-account-cash</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <admin-client-sale-detail
      :dialog.sync="dialogShow"
      :client-sale.sync="clientSale"
    />
    <admin-client-pay
      :dialog.sync="dialogPay"
      :client-sale.sync="clientSale"
    />
  </div>
</template>

<script>
  import { pagination } from '@/mixins/pagination'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { getSaleClientsApi } from '@/api/services'
  export default {
    name: 'AdminCLientSaleList',
    components: {
      AdminClientSaleDetail: () => import('./AdminClientSaleDetail'),
      AdminClientPay: () => import('./AdminClientPay'),
    },
    mixins: [pagination],
    data () {
      return {
        headers: [
          {
            text: 'Nombre',
            align: 'center',
            value: 'name',
          },
          {
            text: 'Cédula',
            align: 'center',
            value: 'document',
          },
          {
            text: 'Comición actual',
            align: 'center',
            value: 'current_commission_sale',
          },
          { text: 'Acciones', sortable: false, value: 'accion' },
        ],
        data: [],
        search: '',
        dialogShow: false,
        dialogPay: false,
        clientSale: {},
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapGetters('auth', ['currencyGetter']),
    },
    watch: {
      options: {
        deep: true,
        handler () {
          this.data = []
          this.getSaleCLients()
        },
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      async getSaleCLients () {
        this.SET_LOADING(true)
        const params = {
          sizePage: this.options.itemsPerPage,
          page: this.options.page,
        }
        const serviceResponse = await getSaleClientsApi(params)
        if (serviceResponse.ok) {
          this.data = serviceResponse.data.data
          this.paginate(serviceResponse.data.paginate)
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.SET_LOADING(false)
      },
      detailItem (item) {
        this.clientSale = item
        this.dialogShow = true
      },
      payItem (item) {
        this.clientSale = item
        this.dialogPay = true
      },
    },

  }
</script>
