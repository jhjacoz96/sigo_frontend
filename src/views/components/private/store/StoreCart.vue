<template>
  <v-container fluid>
    <v-row
      class="fill-height"
      justify="center"
    >
      <v-col
        cols="12"
        md="8"
        class="ma-0"
      >
        <base-material-card
          icon="mdi-cart"
          color="secondary"
        >
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Productos en mi carrito
            </div>
          </template>
          <v-card-text>
            <store-cart-list
              :products.sync="products"
            />
            <!-- <v-card
                    v-for="(item, i) in data"
                    :key="i"
                >
                    <div class="d-flex justify-space-between">
                        <div  class="d-flex">
                            <v-img
                            max-width="60"
                            :src="require('@/assets/default.jpg')"
                            />
                            <div class="ml-2">
                                <span class="subtitle-1 d-block">{{ item.name }}</span>
                                <span class="subtitle-1 d-block grey--text">{{ item.price }}</span>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex justify-center">
                                <v-btn
                                    color="primary"
                                    x-small
                                >
                                    <v-icon>
                                    mdi-minus
                                    </v-icon>
                                </v-btn>
                                <span class="mx-2">{{ item.quantify }}</span>
                                <v-btn
                                    color="primary"
                                    x-small
                                >
                                    <v-icon>
                                    mdi-plus
                                    </v-icon>
                                </v-btn>
                            </div>
                            <div class="mt-2 d-flex">
                                <span class="grey--text">Total:</span><span class="ml-1">{{ item.total | price }}</span>
                            </div>
                        </div>
                    </div>
                </v-card> -->
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        md="4"
        class="ma-0"
      >
        <store-cart-summary
          :products.sync="products"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'StoreCart',
    components: {
      StoreCartList: () => import('./StoreCartList'),
      StoreCartSummary: () => import('./StoreCartSummary'),
    },
    data () {
      return {
        products: [],
      }
    },
  }
</script>
