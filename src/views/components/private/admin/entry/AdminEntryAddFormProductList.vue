<template>
  <div class="mt-2">
    <v-data-table
      :headers="headers"
      :items="productsComputed"
      :items-per-page="5"
      disable-sort
    >
      <template v-slot:item.accion="{ item }">
        <v-btn
          icon
          @click="deleteItem(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
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
      <template v-slot:item.sub_total="{ item }">
        {{ (item.quantity * item.price_purchase) | price }} {{ currencyGetter }}
      </template>
      <template v-slot:item.price_purchase="{ item }">
        {{ item.price_purchase }} {{ currencyGetter }}
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import { validationRules } from '@/mixins/validationRules'
  import { mapGetters } from 'vuex'
  export default {
    name: 'AdminEntryAddFormProductList',
    mixins: [validationRules],
    props: {
      products: {
        type: Array,
        default: () => ([]),
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
          { text: 'Cantidad', value: 'quantify' },
          { text: 'Precio de compra', value: 'price_purchase' },
          { text: 'Subtotal', value: 'sub_total' },
          { text: 'Acciones', value: 'accion' },
        ],
      }
    },
    computed: {
      ...mapGetters('auth', ['currencyGetter']),
      productsComputed: {
        get () {
          return this.products
        },
        set (value) {
          this.$emit('update:products', value)
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
    },
    watch: {
      valid: {
        deep: true,
        handler (value) {
          this.validateComputed = !value.some(item => item === false)
        },
      },
    },
    methods: {
      getIndex (item) {
        return this.productsComputed.indexOf(item)
      },
      validateForm () {
        return this.validateComputed
      },
      deleteItem (item) {
        var index = this.productsComputed.indexOf(item)
        this.productsComputed.splice(index, 1)
      },
    },
  }
</script>
