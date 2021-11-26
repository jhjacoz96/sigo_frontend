<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    persistent
  >
    <v-card
      relative
    >
      <v-btn
        icon
        :disabled="loadingState"
        absolute
        right
        large
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title>
        Detalle de producto
      </v-card-title>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-card-text>
          <v-img
            :aspect-ratio="16/9"
            :src="image"
          />
          <div class="d-flex justify-space-between mt-4">
            <div>
              <h3 class="text-h3 font-weight-medium">
                {{ product.name }}
              </h3>
              <div class="grey--text mt-1">
                {{ product.category.name }}
              </div>
            </div>
            <div>
              <div class="grey--text">
                Stock:
              </div>
              <div>
                {{ product.stock }}
              </div>
            </div>
          </div>
          <div class="d-flex justify-space-between mt-4">
            <div>
              <div class="mt-2 grey--text">
                Precio:
              </div>
              <h3 class="pimary--text">
                {{ product.price_sale }}  {{ currencyGetter }}
              </h3>
            </div>
            <div>
              <v-text-field
                v-model="data.quantity"
                class="mt-2"
                label="Cantidad"
                :rules="validation_rules_quantity"
                solo
                type="number"
              >
                <v-icon>mdi-plus</v-icon>
              </v-text-field>
            </div>
          </div>
          <div>
            {{ product.comment }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :color="product.favorites.includes(userState.profile.id) ? 'red' : ''"
            icon
            @click="saveFavorite(product.id)"
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn
            :disabled="!valid || loadingState"
            :loading="loadingState"
            color="primary"
            @click="addCart"
          >
            Agregar al carrito
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import { validationRules } from '@/mixins/validationRules'
  import {
    saveFavoriteApi,

    addCartApi,
  } from '@/api/services'

  export default {
    name: 'StoreProductDetail',
    mixins: [validationRules],
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      product: {
        type: Object,
        default: () => ({}),
      },
      indexEdit: {
        type: Number,
        default: -1,
      },
    },
    data () {
      return {
        valid: true,
        data: {
          product_id: null,
          quantity: 1,
          client_id: null,
        },
        image_default: require('@/assets/default.jpg'),
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapState('auth', ['userState']),
      ...mapGetters('auth', ['currencyGetter']),
      image () {
        return this.product.image ? this.product.image : this.image_default
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
      indexEdit (value) {
        if (value !== -1) this.data.quantity = this.product.quantity
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      ...mapMutations('cart', ['SET_ITEM_CART']),
      close () {
        var value = false
        this.$nextTick(() => {
          this.$emit('update:dialog', value)
        })
      },
      async addCart () {
        this.SET_LOADING(true)
        this.data.product_id = this.product.id
        this.data.client_id = this.userState.profile.id
        const serviceResponse = await addCartApi(this.data)
        if (serviceResponse.ok) {
          if (this.indexEdit !== -1) {
            this.products[this.indexEdit].quantity = this.data.quantity
          } else {
            this.SET_ITEM_CART(this.data.product_id)
          }
          this.close()
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
        this.SET_LOADING(false)
      },
      async saveFavorite (id) {
        var data = {
          product_id: id,
        }
        const serviceResponse = await saveFavoriteApi(data)
        if (serviceResponse.ok) {
          var exist = this.product.favorites.includes(this.userState.profile.id)
          if (!exist) this.product.favorites.push(this.userState.profile.id)
          else {
            var index = this.product.favorites.indexOf(this.userState.profile.id)
            this.product.favorites.splice(index, 1)
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
