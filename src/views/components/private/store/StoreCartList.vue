<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="productsComputed"
      :loading="loadingState"
      :items-per-page="5"
      disable-sort
      :mobile-breakpoint="0"
    >
      <template v-slot:item.name="{ item }">
        <base-image-preview
          :src="item.product.image"
          :name="item.product.name"
        />
      </template>
      <template v-slot:item.sub_total="{ item }">
        <span>{{ item.product.price_sale * item.quantity | price }} {{ currencyGetter }}</span>
      </template>
      <template v-slot:item.price_sale="{ item }">
        <span>{{ item.product.price_sale }} {{ currencyGetter }}</span>
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
  import { mapMutations, mapState, mapGetters } from 'vuex'
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
          { text: 'Producto', value: 'name' },
          { text: 'Precio', value: 'price_sale' },
          { text: 'Cantidad', value: 'quantity' },
          { text: 'Sub total', value: 'sub_total' },
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
      ...mapGetters('auth', ['currencyGetter']),
      productsComputed: {
        get () {
          return this.products
        },
        set (value) {
          this.$emit('update:products', value)
        },
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      // async getCart () {
      //   this.SET_LOADING(true)
      //   const serviceResponse = await getCartApi()
      //   if (serviceResponse.ok) {
      //     this.productsComputed = serviceResponse.data.data
      //     this.paginate(serviceResponse.data.paginate)
      //   } else {
      //     this.SET_ALERT({
      //       text: serviceResponse.message.text,
      //       color: 'warning',
      //     })
      //   }
      //   this.SET_LOADING(false)
      // },
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
