<template>
  <div class="mt-2">
    <v-data-table
      :headers="headers"
      :items="productsComputed"
      :items-per-page="5"
    >
      <template v-slot:item.accion="{ item }">
        <v-btn
          icon
          @click="deleteItem(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.subtotal="{ item }">
        {{ (item.quantity * item.price_sale) | price }}
      </template>
      <template v-slot:item.quantify="{ item }">
        <v-form
          ref="form"
          v-model="valid[getIndex(item)]"
          lazy-validation
        >
          <div class="ma-auto">
            <v-text-field
              v-model="item.quantity"
              :rules="validation_rules_quantity"
              outlined
              dense
            />
          </div>
        </v-form>
      </template>
    </v-data-table>
    <v-card>
      <v-card-title>
        Resumen <v-spacer />
      </v-card-title>
      <v-card-text class="mt-3">
        <div class="d-flex justify-space-between">
          <div>Total</div>
          <div class="grey--text">
            {{ total | price }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
  import { validationRules } from '@/mixins/validationRules'
  export default {
    name: 'AdminOrderAddFormProductList',
    mixins: [validationRules],
    props: {
      products: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
        valid: [],
        headers: [
          {
            text: 'Producto',
            align: 'center',
            value: 'name',
          },
          { text: 'Cantidad', align: 'center', value: 'quantify' },
          { text: 'Precio de venta', align: 'center', value: 'price_sale' },
          { text: 'Subtotal', align: 'center', value: 'subtotal' },
          { text: 'Acciones', align: 'center', value: 'accion' },
        ],
      }
    },
    computed: {
      productsComputed: {
        get () {
          return this.products
        },
        set (value) {
          this.$emit('update:products', value)
        },
      },
      total () {
        if (this.productsComputed.length <= 0) return 0
        else {
          return this.productsComputed
            .map(item => item.price_sale * item.quantity)
            .reduce((acc, item) => acc + item)
        }
      },
    },
    methods: {
      deleteItem (item) {
        var index = this.productsComputed.indexOf(item)
        this.productsComputed.splice(index, 1)
      },
      getIndex (item) {
        return this.productsComputed.indexOf(item)
      },
    },
  }
</script>
