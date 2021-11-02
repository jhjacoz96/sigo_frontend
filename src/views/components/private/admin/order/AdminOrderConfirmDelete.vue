<template>
  <v-dialog
    v-model="dialogDeleteComputed"
    max-width="400"
    persistent
  >
    <v-card
      relative
    >
      <v-btn
        :disabled="loadingState"
        icon
        absolute
        right
        large
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-text class="text-center">
        ¿Está seguro que desea realizar esta acción?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="loadingState"
          :loading="loadingState"
          color="primary"
          @click="deleteItem"
        >
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { deleteOrderAdminApi } from '@/api/services'
  export default {
    name: 'AdminOrderDelete',
    props: {
      dialogDelete: {
        type: Boolean,
        default: false,
      },
      orders: {
        type: Array,
        default: () => ([]),
      },
      order: {
        type: Object,
        default: () => ({}),
      },
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ordersComputed: {
        get () {
          return this.orders
        },
        set (value) {
          this.$emit('update:orders', value)
        },
      },
      dialogDeleteComputed: {
        get () {
          return this.dialogDelete
        },
        set (value) {
          this.$emit('update:dialogDelete', value)
        },
      },
      orderComputed: {
        get () {
          return this.order
        },
        set (value) {
          this.$emit('update:order', value)
        },
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
    },
    methods: {
      ...mapMutations(['SET_LOADING', 'SET_ALERT']),
      async deleteItem () {
        this.SET_LOADING(true)
        const serviceResponse = await deleteOrderAdminApi(this.order.id)
        if (serviceResponse.ok) {
          var index = this.ordersComputed.indexOf(this.order)
          this.ordersComputed.splice(index, 1)
          this.totalItems--
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
        this.close()
        this.SET_LOADING(false)
      },
      close () {
        this.$nextTick(() => {
          this.dialogDeleteComputed = false
          this.orderComputed = {}
        })
      },
    },
  }
</script>
