<template>
  <v-data-table
    :headers="headers"
    :items="products"
  >
    <template v-slot:item.accion="{ item }">
      <v-btn
        color="success"
        :disabled="loadingState"
        icon
        @click="addCart(item)"
      >
        <v-icon>mdi-cart-plus</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import {
    getFavoritesApi,
    addCartApi,
  } from '@/api/services'
  export default {
    name: 'StoreHeartList',
    data () {
      return {
        products: [],
        headers: [
          { text: 'Producto', value: 'product.name' },
          { text: 'Disponibilidad', value: 'product.stock' },
          { text: 'Precio', value: 'product.price_sale' },
          { text: 'Acción', sortable: false, value: 'accion' },
        ],
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapState('auth', ['userState']),
    },
    created () {
      this.getFavorites()
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      ...mapMutations('cart', ['SET_ITEM_CART']),
      async getFavorites () {
        const serviceResponse = await getFavoritesApi()
        if (serviceResponse.ok) {
          this.products = serviceResponse.data
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async addCart (item) {
        this.SET_LOADING(true)
        const data = {
          client_id: this.userState.profile.id,
          product_id: item.product_id,
          quantity: 1,
        }
        const serviceResponse = await addCartApi(data)
        if (serviceResponse.ok) {
          this.SET_ITEM_CART(item.product_id)
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
      },
    },
  }
</script>
