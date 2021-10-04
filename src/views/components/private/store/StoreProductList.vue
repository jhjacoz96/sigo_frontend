<template>
  <div>
    <v-row
      class="fill-height"
      align="center"
      justify="center"
    >
      <v-col
        v-for="(product, index) in products"
        :key="index"
        class="pa-0"
        sm="12"
        md="4"
        lg="3"
        xl="2"
      >
        <store-product-list-item
          :product="product"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'StoreProductList',
    components: {
      StoreProductListItem: () => import('./StoreProductListItem'),
    },
    data () {
      return {
        products: [
          {
            image: '',
            name: 'Pintura roja',
            category: {
              name: 'Pinturas',
            },
            price: 1200,
          },
          {
            image: '',
            name: 'Lija 20X30cm',
            category: {
              name: 'Lisjas',
            },
            price: 1200,
          },
          {
            image: '',
            name: 'Pintura matiz verde',
            category: {
              name: 'Pinturas',
            },
            price: 1200,
          },
          {
            image: '',
            name: 'Pintura matiz roja',
            category: {
              name: 'Pinturas',
            },
            price: 1200,
          },
          {
            image: '',
            name: 'Funda morada',
            category: {
              name: 'Fundas',
            },
            price: 1200,
          },
          {
            image: '',
            name: 'Brocha grande',
            category: {
              name: 'Brochas',
            },
            price: 1200,
          },
        ],
      }
    },
  }
</script>
