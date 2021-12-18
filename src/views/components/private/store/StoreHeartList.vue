<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :loading="loadingState"
    :options.sync="options"
    :server-items-length="totalItems"
    :page-count="numberOfPages"
    :footer-props="footerProps"
    :mobile-breakpoint="0"
    :items-per-page="5"
    disable-sort
  >
    <template v-slot:item.name="{ item }">
      <base-image-preview
        :src="item.product.image"
        :name="item.product.name"
      />
    </template>
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
    <template v-slot:item.price_sale="{ item }">
      {{ item.product.price_sale }} {{ currencyGetter }}
    </template>
  </v-data-table>
</template>

<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { pagination } from '@/mixins/pagination'
  import {
    getFavoritesApi,
    addCartApi,
  } from '@/api/services'
  export default {
    name: 'StoreHeartList',
    mixins: [pagination],
    data () {
      return {
        products: [],
        headers: [
          { text: 'Producto', value: 'name' },
          { text: 'Stock', value: 'product.stock' },
          { text: 'Precio', value: 'price_sale' },
          { text: 'Acción', sortable: false, value: 'accion' },
        ],
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapState('auth', ['userState']),
      ...mapGetters('auth', ['currencyGetter']),
    },
    watch: {
      options: {
        deep: true,
        handler () {
          this.ordersComputed = []
          this.getOrders()
        },
      },
    },
    created () {
      this.getFavorites()
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      ...mapMutations('cart', ['SET_ITEM_CART']),
      async getFavorites () {
        this.SET_LOADING(true)
        const params = {
          sizePage: this.options.itemsPerPage,
          page: this.options.page,
        }
        const serviceResponse = await getFavoritesApi()
        if (serviceResponse.ok) {
          this.products = serviceResponse.data.data
          this.paginate(serviceResponse.data.paginate)
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.SET_LOADING(false)
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
