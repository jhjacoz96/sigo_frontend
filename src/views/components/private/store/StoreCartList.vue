<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="productsComputed"
    >
      <template v-slot:item.price_sale="{ item }">
        <span>{{ item.product.price_sale * item.quantity }}</span>
      </template>
      <template v-slot:item.quantity="{ item }">
        <v-btn
          color="grey"
          x-mall
          :disabled="loadingState"
          @click="updateCart(item)"
        >
          {{ item.quantity }}
        </v-btn>
      </template>
      <template v-slot:item.accion="{ item }">
        <v-btn
          color="pink"
          :disabled="loadingState"
          icon
          @click="deleteCart(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <store-cart-delete
      :product="product"
      :products.sync="productsComputed"
      :dialog.sync="dialogDelete"
    />
    <store-cart-add
      :index-edit="indexEdit"
      :product="product"
      :products.sync="productsComputed"
      :dialog.sync="dialogUpdate"
    />
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import {
    getCartApi,
  } from '@/api/services'
  export default {
    name: 'StoreCartList',
    components: {
      StoreCartDelete: () => import('./StoreCartDelete'),
      StoreCartAdd: () => import('./StoreCartAdd'),
    },
    props: {
      products: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
        headers: [
          { text: 'Producto', value: 'product.name' },
          { text: 'Precio', value: 'product.price_sale' },
          { text: 'Cantidad', value: 'quantity' },
          { text: 'Sub total', value: 'price_sale' },
          { text: 'Acción', sortable: false, value: 'accion' },
        ],
        product: {},
        dialogDelete: false,
        dialogUpdate: false,
        indexEdit: -1,
      }
    },
    computed: {
      ...mapState(['loadingState']),
      productsComputed: {
        get () {
          return this.products
        },
        set (value) {
          this.$emit('update:products', value)
        },
      },
    },
    created () {
      this.getCart()
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      async getCart () {
        const serviceResponse = await getCartApi()
        if (serviceResponse.ok) {
          this.productsComputed = serviceResponse.data
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      deleteCart (item) {
        this.product = item
        this.dialogDelete = true
      },
      updateCart (item) {
        this.indexEdit = this.productsComputed.indexOf(item)
        this.product = item
        this.dialogUpdate = true
      },
    },
  }
</script>
