<template>
  <v-container fluid>
    <v-row
      class="fill-height"
      align="center"
      justify="center"
    >
      <v-col
        v-for="(category, index) in categories"
        :key="index"
        class="py-0"
        cols="6"
        sm="4"
        md="3"
      >
        <store-category-list-item
          :category="category"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'StoreProductList',
    components: {
      StoreCategoryListItem: () => import('./StoreCategoryListItem'),
    },
    data () {
      return {
        categories: [
          {
            image: '@/assets/default.jpg',
            name: 'Pinturas',
            quantifyProducts: 10,
          },
          {
            image: '@/assets/default.jpg',
            name: 'Lijas',
            quantifyProducts: 20,
          },
          {
            image: '@/assets/default.jpg',
            name: 'Lijas',
            quantifyProducts: 20,
          },
        ],
      }
    },
  }
</script>
