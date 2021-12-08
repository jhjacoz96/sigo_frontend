<template>
  <div>
    <v-row class="justify-space-between">
      <v-col
        cols="12"
        sm="6"
      >
        <base-material-stats-card
          color="secondary"
          icon="mdi-cash"
          title="Cantidad de ventas"
          :value="data ? data.current_count_sale : 0"
          sub-icon="mdi-cash-fast"
          sub-icon-color="red"
          :sub-text="`Mes pasado: ${data ? data.last_count_sale : 0}`"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <base-material-stats-card
          color="secondary"
          icon="mdi-credit-card"
          title="Comisión"
          :value="formatMoney(data ? data.current_commission_sale : 0)"
          sub-icon="mdi-cash-fast"
          sub-icon-color="red"
          :sub-text="`Mes pasado: ${formatMoney(data ? data.last_commission_sale  : 0)}  ${currencyGetter}`"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <base-material-chart-card
          :data="chart.data"
          :options="chart.options"
          color="secondary"
          type="Line"
          class="px-4 py-3"
        >
          <h4 class="display-1 font-weight-light mt-2">
            Ventas del mes actual
          </h4>

          <div class="grey--text font-weight-light">
            {{ formatMoney(data ? data.current_amount_sale : 0) }} {{ currencyGetter }}
          </div>
        </base-material-chart-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import { getDashboardApi } from '@/api/services'
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    name: 'HomeSale',
    data () {
      return {
        data: undefined,
      }
    },
    computed: {
      ...mapGetters('auth', ['currencyGetter']),
      chart () {
        return {
          data: {
            labels: this.data ? this.data.chart_sale.labels : [],
            series: [
              this.data ? this.data.chart_sale.data : []
            ],
          },
          options: {
            low: 0,
            high: 50,
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
            showPoint: false,
          },
        }
      },
    },
    created () {
      this.getDashboard()
    },
    methods: {
      ...mapMutations(['SET_ALERT']),
      async getDashboard () {
        const serviceResponse = await getDashboardApi()
        if (serviceResponse.ok) {
          this.data = serviceResponse.data
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      formatMoney (amount) {
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
