<template>
  <div
    @click="addCart"
  >
    <base-item-product
      :src="image"
    >
      <template v-slot:descriptions>
        <div class="display-1">
          {{ productComputed.name }}
        </div>
        <span class="subtitle-1 grey--text d-block">{{ productComputed.category.name }}</span>
        <div class="display-2 mt-1">
          {{ productComputed.price_sale }} {{ currencyGetter }}
        </div>
      </template>
      <!-- <template v-slot:actions>
        <v-btn
          :color="productComputed.favorites.includes(userState.profile.id) ? 'red' : ''"
          icon
          @click="saveFavorite(productComputed.id)"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          @click="addCart()"
        >
          <v-icon>mdi-cart-plus</v-icon>
        </v-btn>
      </template> -->
    </base-item-product>
    <store-product-detail
      :product.sync="productComputed"
      :dialog.sync="dialog"
    />
  </div>
</template>

<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  export default {
    name: 'StoreProductListItem',
    components: {
      StoreProductDetail: () => import('./StoreProductDetail'),
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
        dialog: false,
        image_default: require('@/assets/default.jpg'),
      }
    },
    computed: {
      ...mapState('auth', ['userState']),
      ...mapGetters('auth', ['currencyGetter']),
      productComputed: {
        get () {
          return this.product
        },
        set (value) {
          this.$emit('update:product', value)
        },
      },
      image () {
        return this.productComputed.image ? this.productComputed.image : this.image_default
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT']),
      addCart () {
        this.dialog = true
      },
    },
  }
</script>
