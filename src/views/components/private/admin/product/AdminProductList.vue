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
          clearable
          :append-outer-icon="'mdi-magnify'"
          @keydown.enter.prevent="searchItem"
          @click:append-outer="searchItem"
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :search="search"
        :loading="loadingState"
        :items="productsComputed"
        :options.sync="options"
        :server-items-length="totalItems"
        :page-count="numberOfPages"
        :footer-props="footerProps"
        :mobile-breakpoint="0"
        :items-per-page="per"
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
        <template v-slot:item.name="{ item }">
          <base-image-preview
            :src="item.image"
            :name="item.name"
          />
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
  import { pagination } from '@/mixins/pagination'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { getProductsApi } from '@/api/services'
  export default {
    name: 'AdminProductList',
    components: {
      AdminProductDelete: () => import('./AdminProductDelete'),
      AdminProductAdd: () => import('./AdminProductAdd'),
    },
    mixins: [pagination],
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
    watch: {
      options: {
        deep: true,
        handler () {
          this.productsComputed = []
          this.getProducts()
        },
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      searchItem () {
        this.productsComputed = []
        this.options.itemsPerPage = this.per
        this.options.page = 1
        this.totalItems = 0
        this.numberOfPages = 0
        this.getProducts()
      },
      async getProducts () {
        const params = {
          sizePage: this.options.itemsPerPage,
          page: this.options.page,
          search: this.search,
        }
        this.SET_LOADING(true)
        const serviceResponse = await getProductsApi(params)
        if (serviceResponse.ok) {
          this.productsComputed = serviceResponse.data.data
          this.paginate(serviceResponse.data.paginate)
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
