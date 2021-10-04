<template>
  <v-dialog
    v-model="dialog"
    width="600"
    persistent
  >
    <v-card
      relative
    >
      <v-btn
        icon
        absolute
        right
        large
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title>
        Detalles de pedido
      </v-card-title>
      <v-card-text>
        Detalles
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: 'StoreOrderDetail',
    props: {
      dialog: {
        type: Boolean,
        default: false,
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
    watch: {
      dialog (value) {
        value || this.close()
      },
    },
    methods: {
      close () {
        this.$nextTick(() => {
          this.$emit('update:dialog', false)
        })
      },
    },
  }
</script>
