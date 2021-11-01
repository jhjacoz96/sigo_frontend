<template>
  <v-dialog
    v-model="dialog"
    width="400"
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
        {{ title }}
      </v-card-title>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-card-text>
          <v-text-field
            v-model="data.quantity"
            label="Cantidad"
            :rules="[requiredRules, numericRules]"
            outlined
            type="number"
          />
        </v-card-text>
        <v-card-actions class="text-end">
          <v-spacer />
          <v-btn
            :disabled="!valid || loadingState"
            :loading="loadingState"
            color="primary"
            @click="addCart"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import {
    addCartApi,
  } from '@/api/services'
  export default {
    name: 'StoreCartAdd',
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
          quantity: 0,
          client_id: null,
        },
        requiredRules: v => !!v || this.$t('validate.required'),
        numericRules: v => /^[0-9]+$/.test(v) || this.$t('validate.invalid.numeric'),
      }
    },
    computed: {
      title () {
        return this.indexEdit === -1 ? 'Agregar producto al carrito' : 'Modificar cantidad'
      },
      ...mapState(['loadingState']),
      ...mapState('auth', ['userState']),
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
        this.data.product_id = this.indexEdit === -1 ? this.product.id : this.product.product.id
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
    },
  }
</script>
