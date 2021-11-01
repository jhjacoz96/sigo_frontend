<template>
  <v-card>
    <v-card-title>
      Carrito
      <v-spacer />
      <admin-entry-add-form-product-add
        :products.sync="expenseComputed.products"
      />
    </v-card-title>

    <admin-entry-add-form-product-list
      ref="adminEntryAddFormProductList"
      :products.sync="expenseComputed.products"
      :validate.sync="validateComputed"
    />
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
    name: 'AdminEntryAddFormProduct',
    components: {
      AdminEntryAddFormProductList: () => import('./AdminEntryAddFormProductList'),
      AdminEntryAddFormProductAdd: () => import('./AdminEntryAddFormProductAdd'),
    },
    mixins: [validationRules],
    props: {
      expense: {
        type: Object,
        default: () => ({}),
      },
      validate: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      expenseComputed: {
        get () {
          return this.expense
        },
        set (value) {
          this.$emit('update:expense', value)
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
        if (this.expenseComputed.products.length <= 0) return 0
        else {
          return this.expenseComputed.products
            .reduce((acc, item) => {
              acc += (item.price_purchase * item.quantity)
              return acc
            }, 0)
        }
      },
    },
    watch: {
      expense: {
        deep: true,
        handler (value) {
          this.expenseComputed.total = this.total.toFixed(2)
        },
      },
    },
    methods: {
      async validateForm () {
        const v = await this.$refs.adminEntryAddFormProductList.validateForm()
        return v
      },
    },
  }
</script>
