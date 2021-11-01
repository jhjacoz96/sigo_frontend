<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
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
      <v-card-text class="text-center">
        ¿Esta seguro de realizar esta acción?
      </v-card-text>
      <v-card-actions class="text-end">
        <v-spacer />
        <v-btn
          :disabled="loadingState"
          :loading="loadingState"
          color="primary"
          @click="deleteCart"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import {
    deleteCartApi,
  } from '@/api/services'

  export default {
    name: 'StoreCartDelete',
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      product: {
        type: Object,
        default: () => ({}),
      },
      products: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState(['loadingState']),
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      ...mapMutations('cart', ['REMOVE_ITEM_CART']),
      close () {
        var value = false
        this.$nextTick(() => {
          this.$emit('update:dialog', value)
        })
      },
      async deleteCart () {
        this.SET_LOADING(true)
        const serviceResponse = await deleteCartApi(this.product.id)
        if (serviceResponse.ok) {
          var index = this.products.indexOf(this.product)
          this.products.splice(index, 1)
          this.REMOVE_ITEM_CART(this.product.product.id)
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
    },
  }
</script>
