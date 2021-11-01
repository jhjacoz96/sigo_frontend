<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        v-for="(product, index) in productsComputed"
        :key="index"
        class="pa-0"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <store-product-list-item
          :product.sync="product"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'StoreProductList',
    components: {
      StoreProductListItem: () => import('./StoreProductListItem'),
    },
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
      productsComputed: {
        get () {
          return this.products
        },
        set (value) {
          this.$emit('update:products', value)
        },
      },
    },
  }
</script>
