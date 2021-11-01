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
              Código:
            </div>
            <div>{{ order.code }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <div class="title">
              Cliente:
            </div>
            <div>{{ order.client ? order.client.name : '' }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <div class="title">
              Tipo de pago:
            </div>
            <div>{{ order.type_payment }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <div class="title">
              Estado:
            </div>
            <div>{{ order.status }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <div class="title">
              Total:
            </div>
            <div>{{ order.total }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <div class="title">
              Fecha:
            </div>
            <div>{{ moment(order.created_at).format('D-M-YYYY') }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="order.products"
          disable-sort
        >
          <template v-slot:top>
            Productos de la orden
          </template>
          <template v-slot:item.sub_total="{ item }">
            {{ item.price_sale * item.quantity | price }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: 'AdminOrderDetail',
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      order: {
        type: Object,
        default: () => ({}),
      },
    },
    data () {
      return {
        headers: [
          { text: 'Producto', value: 'name' },
          { text: 'Precio de venta', value: 'price_sale' },
          { text: 'Cantidad', value: 'quantity' },
          { text: 'Sub total', value: 'sub_total' },
        ],
      }
    },
    computed: {
      orderFormat () {
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
        ]
        const orderValue = Object.entries(this.order).map(item => {
          const [key, value] = item
          return {
            key,
            value,
          }
        }).filter(item => {
          if (keys.map(item1 => item1.value).includes(item.key)) return item
        })
        return orderValue
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
