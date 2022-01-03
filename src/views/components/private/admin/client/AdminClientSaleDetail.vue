<template>
  <v-dialog
    v-model="dialog"
    width="800"
    persistent
  >
    <v-card
      relative
    >
      <v-btn
        icon
        absolute
        right
        large
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-card-title>
        Detalles de Venta
      </v-card-title>
      <v-card-text>
        Datos del cliente
        <v-divider />
      </v-card-text>
      <v-card-text class="text-center">
        <v-row
          justify="space-between"
          align="center"
        >
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Nombre:
            </div>
            <div>{{ clientSale.name }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Cédula:
            </div>
            <div>{{ clientSale.document }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        Detalles de ventas
        <v-divider />
      </v-card-text>
      <v-card-text class="text-center">
        <v-row
          justify="space-between"
          align="center"
        >
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Monto total de ventas (Mes actual):
            </div>
            <div>{{ formatMoney(clientSale.current_total_sale) }} {{ currencyGetter }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Cantidad de ventas (Mes actual):
            </div>
            <div>{{ clientSale.current_quantity_sale }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Comisión total de ventas (Mes actual):
            </div>
            <div>{{ formatMoney(clientSale.current_commission_sale) }} {{ currencyGetter }}</div>
          </v-col>
        </v-row>
        <v-row
          justify="space-between"
          align="center"
        >
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Monto total de ventas (Mes pasado):
            </div>
            <div>{{ formatMoney(clientSale.last_total_sale) }} {{ currencyGetter }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Cantidad de ventas (Mes pasado):
            </div>
            <div>{{ clientSale.last_quantity_sale }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Comisión total de ventas (Mes pasado):
            </div>
            <div>{{ formatMoney(clientSale.last_commission_sale) }} {{ currencyGetter }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :loading="loadingState"
          :items="pays"
          :options.sync="options"
          :server-items-length="totalItems"
          :page-count="numberOfPages"
          :footer-props="footerProps"
          :mobile-breakpoint="0"
          :items-per-page="5"
          disable-sort
        >
          <template v-slot:top>
            <div class="grey--text text--lighten-1">
              Pagos realizados
            </div>
          </template>
          <template v-slot:item.amount="{ item }">
            {{ item.amount }} {{ currencyGetter }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { pagination } from '@/mixins/pagination'
  import { getPaysApi } from '@/api/services'
  export default {
    name: 'AdminClientSaleDetail',
    mixins: [pagination],
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      clientSale: {
        type: Object,
        default: () => ({}),
      },
    },
    data () {
      return {
        headers: [
          { text: 'Comisión pagada', value: 'amount' },
          { text: 'Cantidad de ventas', value: 'quantity' },
          { text: 'Mes', value: 'month' },
          { text: 'Año', value: 'year' },
        ],
        pays: [],
      }
    },
    computed: {
      ...mapGetters('auth', ['currencyGetter']),
      ...mapState(['loadingState']),
    },
    watch: {
      dialog (value) {
        value || this.close()
        if (value) {
          this.pays = []
          this.getPays()
        } else {
          this.pays = []
        }
      },
      options: {
        deep: true,
        handler () {
          this.pays = []
          this.getPays()
        },
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      close () {
        this.$nextTick(() => {
          this.$emit('update:dialog', false)
        })
      },
      async getPays () {
        const params = {
          sizePage: this.options.itemsPerPage,
          page: this.options.page,
        }
        this.SET_LOADING(true)
        const serviceResponse = await getPaysApi(params, this.clientSale.id)
        if (serviceResponse.ok) {
          this.pays = serviceResponse.data.data
          this.paginate(serviceResponse.data.paginate)
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.SET_LOADING(false)
      },
      formatMoney (amount) {
        amount = parseFloat(amount)
        var decimalCount = 2
        var decimal = '.'
        var thousands = ','
        decimalCount = Math.abs(decimalCount)
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount

        const negativeSign = amount < 0 ? '-' : ''

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
        let j = (i.length > 3) ? i.length % 3 : 0

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
      },
    },
  }
</script>
