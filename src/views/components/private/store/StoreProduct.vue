<template>
  <div>
    <store-search @enter:search="changeSearch($event)" />
    <v-container
      class="text-center mt-6 section justify-center"
    >
      <store-tab
        @click:active="changeCategory($event)"
      />
      <v-responsive class="justify-center">
        <store-product-list :products.sync="products" />
        <base-paginate
          :paginate.sync="paginate"
          @change:paginate="changePaginate($event)"
        />
      </v-responsive>
    </v-container>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import {
    searchProductsApi,
  } from '@/api/services'
  export default {
    name: 'StoreProduct',
    components: {
      StoreProductList: () => import('./StoreProductList'),
      StoreSearch: () => import('./StoreSearch'),
      StoreTab: () => import('./StoreTab'),
    },
    data () {
      return {
        categoryActive: '',
        search: '',
        products: [],
        paginate: {
          total: 0,
          currentPage: 1,
          perPage: 0,
          lastPage: 0,
          fromPage: 0,
          to: 0,
        },
        paginateDefault: {
          total: 0,
          currentPage: 1,
          perPage: 0,
          lastPage: 0,
          fromPage: 0,
          to: 0,
        },
      }
    },
    created () {
      this.getProducts(1, '')
    },
    methods: {
      ...mapMutations(['SET_ALERT']),
      changeCategory (slug) {
        this.categoryActive = slug
        this.getProducts(1, slug, this.search)
      },
      changePaginate (paginate) {
        this.getProducts(paginate, this.categoryActive, this.search)
      },
      changeSearch (search) {
        this.search = search
        this.getProducts(1, this.categoryActive, search)
      },
      async getProducts (page, slug, search) {
        var options = {
          params: {
            search: search,
            category: slug,
            page: page,
            sizePage: 10,
          },
        }
        const serviceResponse = await searchProductsApi(options)
        if (serviceResponse.ok) {
          this.products = serviceResponse.data.products
          this.paginate = serviceResponse.data.paginate
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
    },
  }
</script>
