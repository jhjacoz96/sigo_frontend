<template>
  <div>
    <base-item-product :src="product.image">
      <template v-slot:descriptions>
        <span clas="title-1 d-block">{{ product.name }}</span>
        <span class="subtitle-1 grey--text d-block">{{ product.category.name }}</span>
        <span class="green--text h1">{{ product.price | price }}</span>
      </template>
      <template v-slot:actions>
        <v-btn
          icon
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          @click="addCart"
        >
          <v-icon>mdi-cart-plus</v-icon>
        </v-btn>
      </template>
    </base-item-product>
    <store-cart-add
      :dialog-add-cart.sync="dialogAddCart"
    />
  </div>
</template>

<script>
  export default {
    components: {
      StoreCartAdd: () => import('./StoreCartAdd'),
    },
    filters: {
      price (value) {
        return `${value} $`
      },
    },
    props: {
      product: {
        type: Object,
        default: () => ({}),
      },
    },
    data () {
      return {
        dialogAddCart: false,
      }
    },
    methods: {
      addCart () {
        this.dialogAddCart = true
      },
    },
  }
</script>
