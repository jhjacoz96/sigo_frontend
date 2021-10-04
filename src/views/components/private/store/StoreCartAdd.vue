<template>
  <v-dialog
    v-model="dialogAddCart"
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
        Agregar producto al carrito
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Cantidad"
          type="number"
          outlined
        />
      </v-card-text>
      <v-card-actions class="text-end">
        <v-btn
          float="right"
          color="primary"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: 'StoreCartAdd',
    props: {
      dialogAddCart: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
      }
    },
    watch: {
      dialogAddCart (value) {
        value || this.close()
      },
    },

    methods: {
      close () {
        var value = false
        this.$nextTick(() => {
          this.$emit('update:dialogAddCart', value)
        })
      },
    },
  }
</script>
