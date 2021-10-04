<template>
  <v-container
    tag="section"
    fluid
  >
    <store-tab />
    <v-responsive class="justify-center">
      <!-- <v-card class="py-4 px-2">
        <div class="d-flex">
          <span class="d-inline-block">Productos populares</span>
          <v-spacer />
          <router-link
            class="d-inline-block"
            to="#"
          >
            Ver todos los productos
          </router-link>
        </div>
      </v-card> -->
      <store-product-list />
    </v-responsive>
  </v-container>
</template>

<script>
  export default {
    name: 'StoreInicio',
    components: {
      StoreProductList: () => import('./StoreProductList'),
      // StoreCategoryList: () => import('./StoreCategoryList'),
      StoreTab: () => import('./StoreTab'),
    },
    data () {
      return {
      }
    },
    methods: {
    },
  }
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #00CAE3;
  }
</style>
