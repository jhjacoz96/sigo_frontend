<template>
  <v-card>
    <v-card-title>
      Carrito
      <v-spacer />
      <admin-order-add-form-product-add :products="orderComputed.products" />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="orderComputed.products"
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
      <template v-slot:item.sub_total="{ item }">
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
              type="number"
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
  </v-card>
</template>

<script>
  import { validationRules } from '@/mixins/validationRules'
  export default {
    name: 'AdminOrderAddFormProduct',
    components: {
      AdminOrderAddFormProductAdd: () => import('./AdminOrderAddFormProductAdd'),
    },
    mixins: [validationRules],
    props: {
      order: {
        type: Object,
        default: () => ({}),
      },
      validate: {
        type: Boolean,
        default: false,
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
          { text: 'Precio', align: 'center', value: 'price_sale' },
          { text: 'Subtotal', align: 'center', value: 'sub_total' },
          { text: 'Acciones', align: 'center', value: 'accion' },
        ],
      }
    },
    computed: {
      orderComputed: {
        get () {
          return this.order
        },
        set (value) {
          this.$emit('update:order', value)
        },
      },
      validateComputed: {
        get () {
          return this.validate
        },
        set (value) {
          this.$emit('update:validate', value)
        },
      },
      total () {
        if (this.orderComputed.products.length <= 0) return 0
        else {
          return this.orderComputed.products
            .reduce((acc, item) => {
              acc += (item.price_sale * item.quantity)
              return acc
            }, 0)
        }
      },
    },
    watch: {
      order: {
        deep: true,
        handler (value) {
          console.log(this.total.toFixed(2))
          this.orderComputed.total = this.total.toFixed(2)
        },
      },
      valid: {
        deep: true,
        handler (value) {
          this.validateComputed = !value.some(item => item === false)
        },
      },
    },
    methods: {
      deleteItem (item) {
        var index = this.orderComputed.products.indexOf(item)
        this.orderComputed.products.splice(index, 1)
      },
      getIndex (item) {
        return this.orderComputed.products.indexOf(item)
      },
      validateForm () {
        return this.$refs.form.validate()
      },
    },
  }
</script>
