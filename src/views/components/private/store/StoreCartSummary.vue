<template>
  <v-card>
    <v-card-title class="my-3">
      Resumen
    </v-card-title>
    <v-card-text>
      <div class="d-flex justify-space-between mx-5">
        <span class="subtitle-1 grey--text">Precio total:</span>
        <span>{{ total | price }} {{ currencyGetter }}</span>
      </div>
    </v-card-text>
    <v-card-text>
      <v-divider />
    </v-card-text>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-card-text>
        <v-select
          v-model="data.type_payment"
          label="Tipo de pago"
          outlined
          :rules="required_rules"
          :items="type_payment"
          dense
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="!valid || products.length <= 0 ? true : false || loadingState"
          :loading="loadingState"
          color="primary"
          @click="saveOrder"
        >
          realizar order
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
  import { saveOrderApi } from '@/api/services'
  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    name: 'StoreCartSummary',
    props: {
      products: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
        valid: true,
        type_payment: ['efectivo', 'transferencia', 'credito'],
        required_rules: [v => !!v || this.$t('validate.required')],
        data: {
          type_payment: '',
          client_id: null,
          total: 0,
          products: [],
        },
      }
    },
    computed: {
      ...mapState('auth', ['userState']),
      ...mapGetters('auth', ['currencyGetter']),
      ...mapState(['loadingState']),
      total () {
        var t = 0
        if (this.products.length > 0) {
          this.products.forEach(item => {
            t += item.product.price_sale * item.quantity
          })
        }
        return t
      },
    },
    methods: {
      ...mapMutations(['SET_LOADING', 'SET_ALERT']),
      ...mapMutations('cart', ['REMOVE_CART']),
      async saveOrder () {
        if (this.$refs.form.validate()) {
          this.SET_LOADING(true)
          this.data.client_id = this.userState.profile.id
          this.data.total = this.total.toFixed(2)
          this.data.products = this.products.map(item => {
            return {
              product_id: item.product_id,
              quantity: item.quantity,
              price_sale: parseFloat(item.product.price_sale),
            }
          })
          const serviceResponse = await saveOrderApi(this.data)
          if (serviceResponse.ok) {
            this.REMOVE_CART()
            this.$router.push('/tienda/pedido')
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
        } else {
          this.SET_ALERT({
            text: 'Datos inválidos',
            color: 'warning',
          })
        }
      },
    },
  }
</script>
