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
        Detalles de pedido
      </v-card-title>
      <v-card-text class="text-center">
        <v-row
          justify="center"
          align="center"
        >
          <v-col
            cols="6"
            sm="4"
          >
            <div class="title">
              Proveedor:
            </div>
            <div>{{ expense.provider ? expense.provider.name : '' }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <div class="title">
              Tipo de pago:
            </div>
            <div>{{ expense.type_payment }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <div class="title">
              Total:
            </div>
            <div>{{ expense.total }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <div class="title">
              Fecha:
            </div>
            <div>{{ moment(expense.created_at).format('D-M-YYYY') }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="expense.products"
        >
          <template v-slot:top>
            Productos del ingreso de compra
          </template>
          <template v-slot:item.sub_total="{ item }">
            {{ item.price_purchase * item.quantity | price }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
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
