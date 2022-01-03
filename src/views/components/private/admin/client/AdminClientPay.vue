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
        Realizar pago de comisión
      </v-card-title>
      <v-card-text class="d-flex justify-center">
        <v-row justify="center">
          <v-col cols="4">
            <v-select
              v-model="data.year"
              label="Año"
              outlined
              filled
              :items="year"
              @change="getMonthAvailable($event)"
            />
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="data.month"
              :disabled="month_avilable.length === 0 || loadingState"
              :loading="loadingState"
              label="Mes"
              outlined
              filled
              item-text="month"
              :items="month_avilable"
              @change="getAmountMonth($event)"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-row
          v-if="sale"
          justify="space-between"
          align="center"
        >
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Monto total de ventas:
            </div>
            <div>{{ formatMoney(sale.sale_amount) }} {{ currencyGetter }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Cantidad de ventas:
            </div>
            <div>{{ sale.sale_quantity }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Comisión total de ventas:
            </div>
            <div>{{ formatMoney(sale.sale_commission) }} {{ currencyGetter }}</div>
          </v-col>
        </v-row>
        <div
          v-else
          class="text-center"
        >
          Sin resultados
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          :disabled="sale === null || loadingState"
          :loading="loadingState"
          @click="submit"
        >
          Pagar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { pagination } from '@/mixins/pagination'
  import { getClientSaleMonthApi, saveSaleClientApi } from '@/api/services'
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
          { text: 'Comición pagada', value: 'amount' },
          { text: 'Cantidad de ventas', value: 'quantity' },
          { text: 'Mes', value: 'month' },
          { text: 'Año', value: 'year' },
        ],
        sale: null,
        data: {
          year: null,
          month: null,
          client_id: null,
        },
        month_avilable: [],
      }
    },
    computed: {
      ...mapGetters('auth', ['currencyGetter']),
      ...mapState(['loadingState']),
      year () {
        var date = new Date()
        var years = []
        years.push(date.getFullYear(), date.getFullYear() - 1)
        return years
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      close () {
        this.sale = null
        this.data = {
          year: null,
          month: null,
          client_id: null,
        }
        this.month_avilable = []
        this.$nextTick(() => {
          this.$emit('update:dialog', false)
        })
      },
      async getMonthAvailable (value) {
        this.month_avilable = []
        this.sale = null
        this.SET_LOADING(true)
        const serviceResponse = await getClientSaleMonthApi({ 'year': value }, this.clientSale.id)
        if (serviceResponse.ok) {
          this.month_avilable = serviceResponse.data
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.SET_LOADING(false)
      },
      getAmountMonth (value) {
        this.sale = this.month_avilable.find(item => item.month === value)
      },
      async submit () {
        this.data.client_id = this.clientSale.id
        this.data.year = parseInt(this.data.year)
        this.SET_LOADING(true)
        const serviceResponse = await saveSaleClientApi(this.data)
        if (serviceResponse.ok) {
          this.close()
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
