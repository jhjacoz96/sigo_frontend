<template>
  <v-container class="text-center justify-center">
    <v-card>
      <v-card-title class="pa-3">
        <v-spacer />
        <v-text-field
          v-model="search"
          dense
          outlined
          label="Buscar"
          color="secondary"
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :search="search"
        :loading="loadingState"
        :items="productsComputed"
        :items-per-page="5"
        disable-sort
      >
        <template v-slot:item.accion="{ item }">
          <v-btn
            v-if="canPermissionsGetter('product.delete')"
            color="primary"
            small
            icon
            @click="editedItem(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            v-if="canPermissionsGetter('product.delete')"
            color="primary"
            small
            icon
            class="ml-1"
            @click="deleteItem(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.price_purchase="{ item }">
          {{ item.price_purchase }} {{ currencyGetter }}
        </template>
        <template v-slot:item.price_sale="{ item }">
          {{ item.price_sale }} {{ currencyGetter }}
        </template>
      </v-data-table>
      <admin-product-delete
        :dialog-delete.sync="dialogDelete"
        :product.sync="product"
        :products.sync="products"
      />
      <admin-product-add
        :dialog.sync="dialog"
        :product.sync="product"
        :index-edit.sync="indexEdit"
        :products.sync="products"
      />
    </v-card>
  </v-container>
</template>

<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { getProductsApi } from '@/api/services'
  export default {
    name: 'AdminProductList',
    components: {
      AdminProductDelete: () => import('./AdminProductDelete'),
      AdminProductAdd: () => import('./AdminProductAdd'),
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
          {
            text: 'Producto',
            align: 'center',
            value: 'name',
          },
          {
            text: 'Precio de venta',
            align: 'center',
            value: 'price_sale',
          },
          {
            text: 'Precio de compra',
            align: 'center',
            value: 'price_purchase',
          },
          {
            text: 'Stock',
            align: 'center',
            value: 'stock',
          },
          {
            text: 'Categoria',
            align: 'center',
            value: 'category.name',
          },
          { text: 'Acciones', sortable: false, value: 'accion' },
        ],
        product: {},
        search: '',
        dialogDelete: false,
        dialog: false,
        indexEdit: -1,
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapGetters('auth', ['currencyGetter', 'canPermissionsGetter']),
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
      this.getProducts()
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      async getProducts () {
        this.SET_LOADING(true)
        const serviceResponse = await getProductsApi()
        if (serviceResponse.ok) {
          this.productsComputed = serviceResponse.data
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.SET_LOADING(false)
      },
      editedItem (item) {
        this.dialog = true
        Object.assign(this.product, item)
        this.indexEdit = this.productsComputed.indexOf(item)
      },
      deleteItem (item) {
        this.dialogDelete = true
        Object.assign(this.product, item)
      },
    },
  }
</script>
