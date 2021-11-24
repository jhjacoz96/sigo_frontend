<template>
  <div>
    <v-btn
      color="primary"
      :small="$vuetify.breakpoint.smAndDown"
      @click="dialog = !dialog"
    >
      Agregar productos <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="700"
      persistent
    >
      <v-card>
        <v-btn
          icon
          absolute
          right
          large
          @click="dialog = !dialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-title>
          Agregar productos
        </v-card-title>
        <v-container>
          <v-card-text>
            <v-spacer />
            <v-text-field
              v-model="search"
              color="secondary"
              label="Buscar"
              outlined
            />
          </v-card-text>
          <v-data-table
            :headers="headers"
            :items="data"
            :search="search"
            :items-per-page="5"
            disable-sort
            :mobile-breakpoint="0"
          >
            <template v-slot:item.name="{ item }">
              <base-image-preview
                :src="item.image"
                :name="item.name"
              />
            </template>
            <template v-slot:item.price_purchase="{ item }">
              {{ item.price_purchase }} {{ currencyGetter }}
            </template>
            <template v-slot:item.accion="{ item }">
              <v-btn
                :disabled="existItem(item)"
                icon
                @click="addCart(item)"
              >
                <v-icon>mdi-cart-plus</v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <v-card-actions>
            <v-spacer />
            <v-btn
              depressed
              @click="dialog=!dialog"
            >
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { getProductsApi } from '@/api/services'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  export default {
    name: 'AdminEntryAddFormProductAdd',
    props: {
      products: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
        dialog: false,
        search: '',
        headers: [
          {
            text: 'Producto',
            align: 'center',
            value: 'name',
          },
          { text: 'Categoria', align: 'center', value: 'category.name' },
          { text: 'Precio de compra', align: 'center', value: 'price_purchase' },
          { text: 'Código', align: 'center', value: 'code' },
          { text: 'Stock', align: 'center', value: 'stock' },
          { text: 'Acciones', align: 'center', sortable: false, value: 'accion' },
        ],
        data: [],
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
          this.$emit('updated:products', value)
        },
      },
    },
    created () {
      this.getProducts()
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      async getProducts () {
        const serviceResponse = await getProductsApi()
        if (serviceResponse.ok) {
          this.data = serviceResponse.data
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      addCart (item) {
        var formatItem = {
          name: item.name,
          quantity: 1,
          product_id: item.id,
          price_purchase: item.price_purchase,
        }
        this.productsComputed.push(formatItem)
      },
      existItem (item) {
        return this.productsComputed.map(i => i.product_id).includes(item.id)
      },
    },
  }
</script>
