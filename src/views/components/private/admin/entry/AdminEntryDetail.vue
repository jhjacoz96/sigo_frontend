<template>
  <v-dialog
    v-model="dialog"
    width="600"
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
        Detalles de gasto
      </v-card-title>
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
              <span>Nombre:</span>
            </div>
            <div>{{ expense.provider ? expense.provider.name : '' }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              <span>Tipo de pago:</span>
            </div>
            <div>{{ expense.type_payment }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              <span>Total:</span>
            </div>
            <div>{{ expense.total }}  {{ currencyGetter }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              <span>Fecha:</span>
            </div>
            <div>{{ moment(expense.created_at).format('D-M-YYYY') }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="expense.products"
          disable-sort
          :items-per-page="5"
          :mobile-breakpoint="0"
        >
          <template v-slot:item.name="{ item }">
            <base-image-preview
              :src="item.image"
              :name="item.name"
            />
          </template>
          <template v-slot:top>
            <div class="grey--text text--lighten-1">
              Productos del gasto
            </div>
          </template>
          <template v-slot:item.sub_total="{ item }">
            {{ item.price_purchase * item.quantity | price }} {{ currencyGetter }}
          </template>
          <template v-slot:item.price_purchase="{ item }">
            {{ item.price_purchase }} {{ currencyGetter }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'AdminEntryDetail',
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      expense: {
        type: Object,
        default: () => ({}),
      },
    },
    data () {
      return {
        headers: [
          { text: 'Producto', value: 'name' },
          { text: 'Precio de compra', value: 'price_purchase' },
          { text: 'Cantidad', value: 'quantity' },
          { text: 'Sub total', value: 'sub_total' },
        ],
      }
    },
    computed: {
      expenseFormat () {
        const keys = [
          {
            name: 'Código',
            value: 'code',
          },
          {
            name: 'Nombre',
            value: 'name',
          },
          {
            name: 'Precio',
            value: 'price_sale',
          },
          {
            name: 'Cantidad',
            value: 'quantity',
          },
          {
            name: 'Catgory',
            value: 'category.name',
          },
        ]
        const expenseValue = Object.entries(this.expense).map(item => {
          const [key, value] = item
          return {
            key,
            value,
          }
        }).filter(item => {
          if (keys.map(item1 => item1.value).includes(item.key)) return item
        })
        return expenseValue
      },
      ...mapGetters('auth', ['currencyGetter']),
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
    },
    methods: {
      close () {
        this.$nextTick(() => {
          this.$emit('update:dialog', false)
        })
      },
    },
  }
</script>
