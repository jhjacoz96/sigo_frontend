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
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        :disabled="products.length <= 0"
        @click="checkout"
      >
        realizar pedido
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
  import { validationRules } from '@/mixins/validationRules'
  import { VMoney } from 'v-money'
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'StoreCartSummary',
    directives: { money: VMoney },
    mixins: [validationRules],
    props: {
      products: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState('auth', ['userState']),
      ...mapGetters('auth', ['currencyGetter']),
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
      checkout () {
        this.$router.push('/tienda/checkout')
      },
    },
  }
</script>
