<template>
  <div>
    <base-item-product :src="productComputed.image">
      <template v-slot:descriptions>
        <div class="title-1">
          {{ productComputed.name }}
        </div>
        <span class="subtitle-1 grey--text d-block">{{ productComputed.category.name }}</span>
        <span class="subtitle-1 grey--text d-block">Stock: {{ productComputed.stock }}</span>
        <span class="green--text h1">Precio: {{ productComputed.price_sale }} {{ currencyGetter }}</span>
      </template>
      <template v-slot:actions>
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
      </template>
    </base-item-product>
    <store-cart-add
      :product="productComputed"
      :dialog.sync="dialog"
    />
  </div>
</template>

<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import {
    saveFavoriteApi,
  } from '@/api/services'
  export default {
    name: 'StoreProductListItem',
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
        dialog: false,
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
    },
    methods: {
      ...mapMutations(['SET_ALERT']),
      addCart () {
        this.dialog = true
      },
      async saveFavorite (id) {
        var data = {
          product_id: id,
        }
        const serviceResponse = await saveFavoriteApi(data)
        if (serviceResponse.ok) {
          var exist = this.productComputed.favorites.includes(this.userState.profile.id)
          if (!exist) this.productComputed.favorites.push(this.userState.profile.id)
          else {
            var index = this.productComputed.favorites.indexOf(this.userState.profile.id)
            this.productComputed.favorites.splice(index, 1)
          }
          this.SET_ALERT({
            text: serviceResponse.message,
            color: 'success',
          })
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
