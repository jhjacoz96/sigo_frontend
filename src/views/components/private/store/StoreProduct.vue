<template>
  <v-container
    class="text-center mt-6"
    fluid
  >
    <base-v-component
      heading="Pinturas"
      sub-heading="10 resultados encontrado"
    />
    <!-- <div class="d-flex flex-column">
        <span class="font-weight-bold display-3">Pintura</span>
        <span>10 resultados encontrados</span>
      </div> -->
    <v-responsive class="justify-center">
      <v-row justify="end">
        <v-col
          cols="6"
          md="4"
          xl="3"
        >
          <v-select
            label="Ordenar por"
            solo
            :items="['Más vendidos', 'Más recientes', 'Más antiguos', 'Menor precio', 'Mayor precio']"
          />
        </v-col>
      </v-row>
      <store-product-list />
    </v-responsive>
  </v-container>
</template>

<script>
  export default {
    name: 'StoreSearch',
    components: {
      StoreProductList: () => import('./StoreProductList'),
    },
  }
</script>
